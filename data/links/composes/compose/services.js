module.exports = __ => {
  const {compose} = __;
  const services = [];
  if(compose.config && compose.config.services) {
    for(const serviceName of Object.keys(compose.config.services)) {
      const service = {
        name: serviceName,
        service: compose.config.services[serviceName],
        containers: []
      };
      services.push(service);
    }
  }
  compose.services = services;
}