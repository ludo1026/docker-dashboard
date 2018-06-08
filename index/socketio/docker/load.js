const load = require('../../../data/load');

module.exports = __ => {
  const {emit} = __;
  return load(__)
    .then((__) => {
      emit('images', __.images);
      emit('containers', __.containers);
      emit('networks', __.networks);
      emit('volumes', __.volumes);
      emit('composes', __.composes);
      emit('environnements', __.environnements);
    })
    .catch((e) => {
      console.error(e);
      emit('error', e);
    })
}