module.exports = function (req, res, next) {
    try {
      res.header("Access-Control-Allow-Origin", "*");
      next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}