(function(window) {
  window.__env = window.__env || {};
  // API url
  window.__env.environmentName = "${ENV}";
  window.__env.appserviceUrl = "${ENV}"
  window.__env.accountServiceUrl = "${ENV}"
  window.__env.notificationServiceUrl = "${ENV}"
  
  window.__env.hrm = "${ENV}"
  window.__env.secure = "${ENV}"
  window.__env.production = "${ENV}"
  window.__env.keycloakUrl = "${ENV}"
  window.__env.keycloakRealm = "${ENV}"
  window.__env.keycloakClientId = "${ENV}"


})(this);
