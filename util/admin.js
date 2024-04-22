var admin = require("firebase-admin");

var serviceAccount = require("Google Cloud Service Account Credentials GO HERE");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };
