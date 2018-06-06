module.exports = __ => {
  const {containers} = __;

  const containers_ByAppVersions_ByAppNames = {};
  for(const container of containers) {
    if(!container.Labels) continue;

    const appName = container.Labels['application.name'];
    const appVersion = container.Labels['application.version'];

    // by appName
    let containers_ByAppVersions_ForAppName = containers_ByAppVersions_ByAppNames[appName];
    if(!containers_ByAppVersions_ForAppName) {
      containers_ByAppVersions_ForAppName = {};
      containers_ByAppVersions_ByAppNames[appName] = containers_ByAppVersions_ForAppName;
    }

    // by appVersion
    let containers_ForAppVersion_ForAppName = containers_ByAppVersions_ForAppName[appVersion];
    if(!containers_ForAppVersion_ForAppName) {
      containers_ForAppVersion_ForAppName = [];
      containers_ByAppVersions_ForAppName[appName] = containers_ForAppVersion_ForAppName;
    }

    containers_ForAppVersion_ForAppName.push(container);
  }
  
  const applications = [];
  for(const appName in containers_ByAppVersions_ByAppNames) {
    for(const appVersion in containers_ByAppVersions_ByAppNames[appName]) {
      applications.push({
        name: appName,
        version: appVersion,
        containers: containers_ByAppVersions_ByAppNames[appName][appVersion]
      });
    }
  }

  return applications;
}