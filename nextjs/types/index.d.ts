export interface KeycloakToken {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: {
      roles: string[];
    };
  };
  scope: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}
export interface RealmAccess {
  roles: string[];
}
export interface ResourceAccess {
  [key: string]: Roles;
}

export interface Roles {
  roles: string[];
}

export declare enum SystemUserPrivilege {
  EMPLOYER = 'employer',
  EMPLOYEE = 'employee',
}
