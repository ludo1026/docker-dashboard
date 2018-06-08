module.exports = __ => {
  const {dockerCompose, app, emit} = __;
  emit('log', 'docker-compose rm');
  app.get('/composes/:composeId/rm', function(req, res) {
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