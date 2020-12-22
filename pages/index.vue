<template>
  <section class="container">
    <div>
      <div>
        <svg ref="svgArea" viewBox="0 0 200 100">
          <rect
            x="0"
            y="0"
            width="200"
            height="100"
            fill="#fff"
            stroke="#12b886"
            stroke-width="15"
          ></rect>
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
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STRAGE_BUCKET
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
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
//終わり

export default {
  data() {
    return {
      text: "クリスマスカード",
      uuid: "1"
    };
  },
  methods: {
    // create() {
    //   var storageRef = firebase.storage().ref();
    //   var createRef = storageRef.child(`${this.uuid}.jpg`);
    //   var canvas = document.createElement("canvas");
    //   var svg = this.$refs.svgArea;
    //   canvas.width = svg.width.baseVal.value;
    //   canvas.height = svg.height.baseVal.value;
    //   const data = new XMLSerializer().serializeToString(this.$refs.svgArea);
    //   canvg(canvas, data);
    //   let image = canvas.toDataURL("image/jpeg").split(",")[1];
    //   createRef.putString(image, "base64").then(snapshot => {
    //     console.log("Uploaded a blob or file!");
    //   });
    // }
    create() {
      svg2imageData(this.$refs.svgArea, data => {
        const storageRef = firebase.storage().ref();
        const createRef = storageRef.child("ogp.jpg");
        createRef.putString(data, "data_url");
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
