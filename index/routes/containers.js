const listContainers = require('../../data/load/containers');

module.exports = (__) => {
  const {app, docker} = __;
  app.get('/containers', function(req, res) {
    listContainers()
      .then((containers) => {
        res.send(containers)
      })
      .catch((err) => {
        res.send(err)
      });
  });
  
  require('./containers/containerId')(__);

}