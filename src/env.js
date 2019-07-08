(function(window) {
  window.__env = window.__env || {};

  // API url
  window.__env.environmentName = "DEVELOPMENT"
  window.__env.appserviceUrl = 'http://dev.viralskills.com/api/appservice/v1'
  window.__env.accountServiceUrl = 'http://dev.viralskills.com/api/accountservice/v1'
  window.__env.notificationServiceUrl = 'http://dev.viralskills.com/api/notificationservice/v1'
  window.__env.hrm = false
  window.__env.secure = false
  window.__env.production = false
  window.__env.keycloakUrl = 'https://auth.viralskills.com/auth'
  window.__env.keycloakRealm = 'local'
  window.__env.keycloakClientId = 'angular-client-web'
})(this);


