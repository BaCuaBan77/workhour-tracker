export interface KeycloakToken {
  exp: number
  iat: number
  jti: string
  iss: string
  aud: string
  sub: string
  typ: string
  azp: string
  session_state: string
  acr: string
  realm_access: {
    roles: string[]
  }
  resource_access: {
    workhour: {
      roles: string[]
    }
  }
  scope: string
  email_verified: boolean
  name: string
  preferred_username: string
  given_name: string
  family_name: string
  email: string
}
export interface RealmAccess {
  roles: string[]
}
export interface ResourceAccess {
  [key: string]: Roles
}

export interface Roles {
  roles: string[]
}

export enum SystemUserPrivilege {
  EMPLOYER = 'employer',
  EMPLOYEE = 'employee',
}

export interface WorkHourDTO {
  startTime: string
  endTime: string
  date: string
  userId: number
}

export interface UserDTO {
  username: string
  email: string
  name: string
}
