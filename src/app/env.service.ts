export class EnvService {
  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public environmentName = "";
  public appserviceUrl = '';
  public accountServiceUrl = '';
  public notificationServiceUrl = '';
  public hrm = '';
  public secure = '';
  public production = '';
  public keycloakUrl = '';
  public keycloakRealm =  '';
  public environment =  '';
  public keycloakClientId = '';

  // Whether or not to enable debug mode

  constructor() {}
}
