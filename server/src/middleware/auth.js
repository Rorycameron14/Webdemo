const { admin, initialized } = require('../config/firebase');

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: no token provided' });
  }

  // Dev mode: no service account configured — trust any bearer token
  if (!initialized) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(401).json({ error: 'Server authentication not configured' });
    }
    req.user = { uid: 'dev-user', email: 'dev@localhost' };
    return next();
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized: invalid or expired token' });
  }
};

module.exports = { requireAuth };
