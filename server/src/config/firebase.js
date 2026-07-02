const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

let initialized = false;

if (!admin.apps.length) {
  let serviceAccount = null;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    } catch {
      console.warn('Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON');
    }
  } else {
    const filePath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
      ? path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
      : path.join(__dirname, '../../firebase-service-account.json');
    if (fs.existsSync(filePath)) {
      serviceAccount = require(filePath);
    }
  }

  if (serviceAccount) {
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    initialized = true;
    console.log('Firebase Admin initialised');
  } else {
    console.warn('Firebase service account not found - token verification disabled');
  }
}

module.exports = { admin, initialized };
