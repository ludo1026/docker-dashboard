const listImages = require('../../data/load/images');

module.exports = __ => {
  const {app, docker} = __;
  app.get('/images', function(req, res) {
    listImages()
      .then((images) => {
        res.send(images)
      })
      .catch((err) => {
        res.send(err)
      });
  });
  require('./images/remove')(__);
}