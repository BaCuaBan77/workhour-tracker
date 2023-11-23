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
import { API, KeycloakToken, UserDTO } from '@/types'
import { useRouter } from 'next/navigation'

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
  const { push } = useRouter()
  // Simulated login and logout functions
  const login = async (
    username: string,
    password: string
  ): Promise<KeycloakToken | undefined> => {
    const res = await fetch(
      `http://${API}:8080/realms/master/protocol/openid-connect/token`,
      createRequestOptions('password', username, password, null)
    )
    const data = await res.json()
    // If no error and we have user data, return it
    if (res.status === 200 && data) {
      const token = data.access_token
      localStorage.setItem('userToken', token)
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

      setUser(keycloakUser)
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
        `http://${API}:8080/realms/master/protocol/openid-connect/logout`,

        createLogoutRequestOptions(user.accessToken)
      )
    }
    setUser(null)
    localStorage.removeItem('userToken')
  }

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('userToken')
    let isAuthenticated = false
    if (user !== null) {
      isAuthenticated = true
    } else if (token) {
      const parsedToken = parseJwt(token)
      if (!parsedToken) {
        return
      }
      const keycloakUser: KeycloakToken = {
        ...parsedToken,
        accessToken: token,
      }

      if (!keycloakUser) {
        return
      }

      setUser(keycloakUser)
    }

    if (isAuthenticated) {
      push('/dashboard')
    } else {
      push('/login')
    }
  }, [user, push])

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
