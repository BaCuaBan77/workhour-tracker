import { KeycloakToken, KeycloakUser } from '@/types'

export const createRequestOptions = (
  grantType: string,
  username: string | null,
  password: string | null,
  refreshToken: string | null
) => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  const urlencoded = new URLSearchParams()
  urlencoded.append('client_id', 'workhour')
  urlencoded.append('grant_type', grantType)
  urlencoded.append('scope', 'openid')
  if (grantType === 'password' && username && password) {
    urlencoded.append('username', username)
    urlencoded.append('password', password)
  }

  return {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded as any,
    mode: 'cors',
    redirect: 'follow',
  } as RequestInit
}

/**
 * Create logout request options
 *
 * @param refreshToken string | null
 * @param accessToken string | null
 */
export const createLogoutRequestOptions = (accessToken: string | null) => {
  const logoutHeaders = new Headers()
  logoutHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  logoutHeaders.append('Authorization', 'Bearer ' + accessToken)
  const logoutBody = new URLSearchParams()
  logoutBody.append('client_id', 'workhour')
  return {
    method: 'POST',
    headers: logoutHeaders,
    body: logoutBody as any,
    mode: 'no-cors',
  } as RequestInit
}

export function parseJwt(token: string): KeycloakUser | undefined {
  var base64Url = token.split('.')[1]
  if (!base64Url || !base64Url[1]) {
    console.error('ParseJwt failed, token invalid')
    return undefined
  }
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}
export function areDatesEqual(a: Date, b: Date): boolean {
  const date1 = new Date(a)
  const date2 = new Date(b)
  // Compare year, month, and day of the two Date objects
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function calculateDuration(startDate: Date, endDate: Date): number {
  const durationInMilliseconds = endDate.getTime() - startDate.getTime()
  return durationInMilliseconds
}
