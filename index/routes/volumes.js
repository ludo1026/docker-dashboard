const listVolumes = require('../../data/load/volumes');

module.exports = (__) => {
  const {app, docker} = __;
  app.get('/volumes', function(req, res) {
    listVolumes()
      .then((volumes) => {
        res.send(volumes)
      })
      .catch((err) => {
        res.send(err)
      });
  });
  
  require('./volumes/volumeId')(__);

}