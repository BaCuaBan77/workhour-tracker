// AuthContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import {
  createLogoutRequestOptions,
  createRequestOptions,
  parseJwt,
} from '@/src/util/utils'
import { KeycloakToken, UserDTO } from '@/types'

// Create the authentication context
interface AuthContextType {
  user: KeycloakToken | null
  login: (
    username: string,
    password: string
  ) => Promise<KeycloakToken | undefined>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Custom hook to access the authentication context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Authentication provider component
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<KeycloakToken | null>(null)

  // Simulated login and logout functions
  const login = async (
    username: string,
    password: string
  ): Promise<KeycloakToken | undefined> => {
    const res = await fetch(
      'http://192.168.0.177:8080/realms/master/protocol/openid-connect/token',
      createRequestOptions('password', username, password, null)
    )
    const data = await res.json()
    // If no error and we have user data, return it
    if (res.status === 200 && data) {
      const token = data.access_token
      const parsedToken = await parseJwt(token)
      if (!parsedToken) {
        return Promise.resolve(undefined)
      }
      const keycloakUser: KeycloakToken = {
        ...parsedToken,
        accessToken: token,
      }

      if (!keycloakUser) {
        return Promise.resolve(undefined)
      }

      setUser(user)
      const userDto: UserDTO = {
        username: keycloakUser.preferred_username,
        email: keycloakUser.email,
        name: keycloakUser.given_name + ' ' + keycloakUser.family_name,
      }
      fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDto),
      })
      return Promise.resolve(keycloakUser)
    }
    return Promise.resolve(undefined)
  }

  const logout = async () => {
    if (user && user.accessToken) {
      await fetch(
        `http://192.168.0.177:8080/realms/master/protocol/openid-connect/logout`,
        createLogoutRequestOptions(user.accessToken)
      )
    }
    setUser(null)
  }

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    // Simulated check (you can replace this with actual authentication logic)
    const isAuthenticated = user !== null

    if (isAuthenticated) {
      // User is authenticated, do something
    } else {
      // User is not authenticated, do something else
    }
  }, [user])

  const authContextValue: AuthContextType = {
    user,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
