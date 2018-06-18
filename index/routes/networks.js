const listNetworks = require('../../data/load/networks');

module.exports = (__) => {
  const {app, docker} = __;
  app.get('/networks', function(req, res) {
    listNetworks()
      .then((networks) => {
        res.send(networks)
      })
      .catch((err) => {
        res.send(err)
      });
  });
  
  require('./networks/networkId')(__);

}