// AuthContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { createRequestOptions, parseJwt } from '@/src/util/utils'
import { KeycloakToken } from '@/types'

// Create the authentication context
interface AuthContextType {
  user: KeycloakToken | null
  login: (username: string, password: string) => Promise<string | undefined>
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
  ): Promise<string | undefined> => {
    const res = await fetch(
      'http://192.168.0.177:8080/realms/master/protocol/openid-connect/token',
      createRequestOptions('password', username, password, null)
    )
    const data = await res.json()
    // If no error and we have user data, return it
    if (res.status === 200 && data) {
      const token = data.access_token
      const user = await parseJwt(token)

      if (!user) {
        return Promise.resolve(undefined)
      }

      setUser(user)
      return Promise.resolve(user.preferred_username)
    }
    return Promise.resolve(undefined)
  }

  const logout = () => {
    // Simulate a logout process
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
