module.exports = __ => {
  const {container} = __;

  if(!container.Labels) return;
    
  const text = container.Labels['traefik.backend'];

  const traefik_frontend_rule = container.Labels['traefik.frontend.rule'];
  
  let href;

  if(traefik_frontend_rule && traefik_frontend_rule.indexOf('PathPrefix: ') === 0) {
    href = traefik_frontend_rule.substring(12);
  }

  if(traefik_frontend_rule && traefik_frontend_rule.indexOf('PathPrefixStrip: ') === 0) {
    href = traefik_frontend_rule.substring(17);
  }

  href = __.traefik_url + href;

  container.url = {
    href,
    text
  };

}