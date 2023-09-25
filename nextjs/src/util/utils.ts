import { KeycloakToken } from '@/types'

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

export function parseJwt(token: string): KeycloakToken | undefined {
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

export function calculateDurationInHours(
  startTime: string,
  endTime: string
): number {
  const startParts = startTime.split(':')
  const endParts = endTime.split(':')

  if (startParts.length !== 2 || endParts.length !== 2) {
    throw new Error('Invalid time format. Use HH:mm')
  }

  const startHour = parseInt(startParts[0], 10)
  const startMinute = parseInt(startParts[1], 10)
  const endHour = parseInt(endParts[0], 10)
  const endMinute = parseInt(endParts[1], 10)

  if (
    isNaN(startHour) ||
    isNaN(startMinute) ||
    isNaN(endHour) ||
    isNaN(endMinute)
  ) {
    throw new Error('Invalid time format. Use HH:mm')
  }

  const startMinutes = startHour * 60 + startMinute
  const endMinutes = endHour * 60 + endMinute

  const durationInMinutes = endMinutes - startMinutes
  const durationInHours = durationInMinutes / 60

  return durationInHours
}
