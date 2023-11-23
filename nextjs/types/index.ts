import { env } from 'process'

export interface KeycloakToken extends KeycloakUser {
  accessToken: string
}
export interface KeycloakUser {
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

export interface FullUserDTO {
  workHours?: {
    id: string
    startTime: Date
    endTime: Date
    duration: number
    userId: number
  }[]
  id: number
  username: string
  email: string
  name: string
  isWorking: boolean
  startAt: Date | null
}

export interface WorkHourDTO {
  startTime: Date
  endTime: Date
  date: string
  userId: number
}

export interface UserDTO {
  username: string
  email: string
  name: string
}
