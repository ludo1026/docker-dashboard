module.exports = __ => {
  const {dockerCompose, app} = __;
  app.get('/composes/:composeId/up', function(req, res) {
    emit('log', 'docker-compose up');
    dockerCompose.up((data) => {
      emit('log', data);
    }, (err) => {
      console.error(err);
      emit('log', err);
    }, (data) => {
      res.send(true);
    });
  });
}