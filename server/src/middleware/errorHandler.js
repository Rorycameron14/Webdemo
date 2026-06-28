const errorHandler = (err, req, res, _next) => {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path}`, err);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large' });
  }

  if (err.message && err.message.includes('File type')) {
    return res.status(415).json({ error: err.message });
  }

  const status = err.status || err.statusCode || 500;
  const message = status < 500 ? err.message : 'Internal server error';

  res.status(status).json({ error: message });
};

module.exports = errorHandler;
