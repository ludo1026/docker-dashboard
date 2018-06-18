module.exports = __ => {
  const {dockerCompose, app} = __;
  app.get('/composes/:composeId/stop', function(req, res) {
    emit('log', 'docker-compose stop');
    dockerCompose.down((data) => {
      emit('log', data);
    }, (err) => {
      console.error(err);
      emit('log', err);
    }, (data) => {
      res.send(true);
    });
  });
}