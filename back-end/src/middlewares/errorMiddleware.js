const middlewareError = (err, _req, res, next) => {
  if (err) res.status(err.status || 500).json({ message: err.message });
  next();
};

module.exports = middlewareError;
