module.exports = __ => {
  const {dockerCompose, app, emit} = __;
  app.get('/composes/:composeId/rm', function(req, res) {
    emit('log', 'docker-compose rm');
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