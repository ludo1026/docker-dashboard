module.exports = __ => {
  const {network, containers} = __;
  network.containers = [];
  for(const container of containers) {
    let found = false;
    if(container.NetworkSettings && container.NetworkSettings.Networks) {
      for(const networkName in container.NetworkSettings.Networks) {
        const networkContainer = container.NetworkSettings.Networks[networkName];
        if(network.Id === networkContainer.NetworkID) {
          found = true;
        }
      }
    }
    if(found) {
      network.containers.push(container);
    }
  }
}
