const load = require('../../data/load');

module.exports = __ => {
  const {dockerCompose, app, projectDir} = __;

  app.get('/composes', function(req, res) {
    load(__)
      .then((__) => {
        res.send(__.composes);
      })
      .catch((err) => {
        console.error(err);
        res.send(err);
      });
  });

  require('./composes/up')(__);
  require('./composes/stop')(__);
  require('./composes/rm')(__);
}
