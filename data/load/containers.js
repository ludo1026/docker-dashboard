const defineName = require('./containers/name');
const defineUrl = require('./containers/url');

module.exports = (__) => {
  const {docker} = __;
  return new Promise((resolve, reject) => {
    docker.listContainers({all: true}, function(err, containers) {
      if(err) {
        reject(err)
      } else {
        for(const container of containers) {
          defineName({...__, container});
          defineUrl({...__, container})
        }
        resolve(containers);
      }
    });
  });
}