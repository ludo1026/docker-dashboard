const groupContainersByApplications = require('./environnements/applications');

module.exports = __ => {
  const {containers} = __;

  const containers_ByNetworks = {};
  for(const container of containers) {
    if(!container.NetworkSettings) continue;
    if(!container.NetworkSettings.Networks) continue;
    for(const networkName in container.NetworkSettings.Networks) {
      if(!containers_ByNetworks[networkName]) {
        containers_ByNetworks[networkName] = [];
      }
      containers_ByNetworks[networkName].push(container);
    }
  }
  
  const environnements = [];
  for(const networkName in containers_ByNetworks) {
    const containers_ForNetwork = containers_ByNetworks[networkName];
    const applications = groupContainersByApplications({
      ...__,
      containers: containers_ForNetwork
    });
    environnements.push({
      name: networkName,
      containers: containers_ForNetwork,
      applications
    });
  }

  return environnements;
}