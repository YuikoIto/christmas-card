const functions = require("firebase-functions");

exports.christmas = functions.https.onRequest((req, res) => {
  if (req.params[0] !== undefined) {
    const [, , param] = req.path.split("/");
    // ファイル名作成
    const filename = param + ".jpg";
    // ストレージ設定
    const storage = new Storage({});
    const bucketName = process.env.STRAGE_BUCKET;
    const path = encodeURIComponent(filename);
    const IMAGE = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${path}?alt=media`;
    const SITEURL = "new-christmas-card.firebaseapp.com";
    const TITLE = "クリスマスカード";
    const DESCRIPTION = "大切な人にクリスマスカードを贈ろうね";
    res.set("Cache-Control", "public, max-age=600, s-maxage=600");

    res.status(200).send(`<!doctype html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>Christmas</title>
        <meta property="og:title" content="${TITLE}">
        <meta property="og:image" content="${IMAGE}">
        <meta property="og:description" content="${DESCRIPTION}">
        <meta property="og:url" content="${SITEURL}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="${TITLE}">
        <meta name="twitter:site" content="クリスマスカード">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${TITLE}">
        <meta name="twitter:image" content="${IMAGE}">
        <meta name="twitter:description" content="${DESCRIPTION}">
      </head>
      <body>
        <script>location.href = "new-christmas-card.firebaseapp.com"; </script>
      </body>
    </html>`);
  }
});
