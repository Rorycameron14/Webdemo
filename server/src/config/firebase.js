const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
  ? path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
  : path.join(__dirname, '../../firebase-service-account.json');

let initialized = false;

if (!admin.apps.length) {
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    initialized = true;
    console.log('Firebase Admin initialised');
  } else {
    console.warn('Firebase service account not found — token verification disabled in dev mode');
  }
}

module.exports = { admin, initialized };
