<template>
  <section class="container">
    <div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          ref="svgArea"
          viewBox="0 0 200 100"
        >
          <rect
            rx="20"
            x="0"
            y="0"
            width="200"
            height="100"
            fill="#fff"
            stroke="#008037"
            stroke-width="15"
          ></rect>
          <circle cx="10" cy="10" r="10" fill="#38b6ff" />
          <circle cx="200" cy="20" r="10" fill="#F44D61" />
          <circle cx="150" cy="10" r="10" fill="#F44D61" />
          <circle cx="100" cy="100" r="10" fill="#5ce1e6" />
          <circle cx="0" cy="80" r="10" fill="#ff5757" />
          <circle cx="50" cy="0" r="10" fill="#ffbd59" />
          <circle cx="180" cy="90" r="10" fill="#bf7753" />
          <circle cx="50" cy="90" r="10" fill="#ffbd59" />
          <text x="50%" y="50%" font-size="8px" text-anchor="middle">
            {{ text }}
          </text>
        </svg>
      </div>
      <div style="text-align:right">
        <input
          v-model="text"
          type="text"
          style="width:100%; margin-bottom:10px"
        />
        <button @click="create">つくる</button>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "firebase";
import canvg from "canvg";
var config = {
  apiKey: process.env.API_KRY,
  authDomain: process.env.AUTH_DOMAIN,
  DATABASE_URL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STRAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};
let db;
if (!firebase.apps.length) {
  const firebaseApp = firebase.initializeApp(config);
  db = firebaseApp.firestore();
}

// svgをjpegに変換
const svg2imageData = (svgElement, successCallback, errorCallback) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0, 1200, 630);
    successCallback(canvas.toDataURL());
  };
  image.onerror = e => {
    errorCallback(e);
  };
  const svgData = new XMLSerializer().serializeToString(svgElement);
  image.src =
    "data:image/svg+xml;charset=utf-8;base64," +
    btoa(unescape(encodeURIComponent(svgData)));
};

export default {
  data() {
    return {
      text: "クリスマスカード",
      description: "大切な人にメッセージカードを贈ろう"
    };
  },
  methods: {
    async create() {
      svg2imageData(this.$refs.svgArea, async data => {
        const storageRef = firebase.storage().ref();
        const createRef = storageRef.child(`${this.text}.jpg`);
        // Cloud Storageにアップロード
        await createRef.putString(data, "data_url");
        const url = await createRef.getDownloadURL();
        console.log(url);

        // Firestoreに保存しておく
        const card = db.collection("cards").doc(this.text);
        await card.set({
          url,
          message: this.description
        });
      });
    }
  }
};
</script>

<style>
.container {
  width: 800px;
  height: 800px;
  margin-top: 50px;
  margin-right: auto;
  margin-left: auto;
}
</style>
