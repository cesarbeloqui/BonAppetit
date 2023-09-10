const serviceAccountFirebase = require("../../serviceAccountKeyFirebase.js");
const admin = require("firebase-admin");

// Inicializa Firebase Admin SDK con las credenciales
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountFirebase),
});

const auth = admin.auth();

module.exports = { auth, admin };
