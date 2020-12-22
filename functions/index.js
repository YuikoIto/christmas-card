const functions = require("firebase-functions");

exports.christmas = functions.https.onRequest((req, res) => {
  const SITEURL = "new-christmas-card.firebaseapp.com";
  const TITLE = "クリスマスカード";
  const DESCRIPTION = "大切な人にクリスマスカードを贈ろうね";
  const IMAGE = `https://firebasestorage.googleapis.com/v0/b/new-christmas-card.appspot.com/o/ogp.jpg?alt=media&token=82318ed0-d0c4-48c2-870a-64a2416d9d5e`;

  res.status(200).send(`<!doctype html>
      <head>
        <title>Time</title>
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
      </body>
    </html>`);
});
