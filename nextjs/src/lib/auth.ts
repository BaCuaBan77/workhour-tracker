import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import  prisma  from "./prisma";
import { KeycloakToken } from "@/types";
import  Provider  from "next-auth/providers/index";



export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),  
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) { 
          return null;
        }
        if (!credentials.username || !credentials.password) {
          return null;
        }
        const res = await fetch("http://192.168.0.177:8080/realms/master/protocol/openid-connect/token", 
          createRequestOptions('password', credentials.username , credentials.password, null)
        )
        const data = await res.json()
        // If no error and we have user data, return it
        if (res.status === 200 && data) {
          const token = data.access_token;
          const user = await parseJwt(token); // Implement this function
          
          if (user) {
            console.error('SUCCESSFULLy')
            return {id: user.email, token:token, ...user};
          } else {
            return null;
          }
        } else {
          return null;
        }
        // Return null if user data could not be retrieved
      }
    })
  ],
  callbacks: {
    async jwt({ token,user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.accessToken = user.token
      }
      return token
    },
    async session({ token, user, session }) {
      if (token) {
        session.user.id = user.id
        session.user.name = token.name
        session.user.email = token.email
      }

      return session
    },
    
  },
}

export const createRequestOptions = (
  grantType: string,
  username: string | null,
  password: string | null,
  refreshToken: string | null
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('client_id', 'workhour');
  urlencoded.append('grant_type', grantType);
  urlencoded.append('scope', 'openid');
  if (grantType === 'password' && username && password) {
    urlencoded.append('username', username);
    urlencoded.append('password', password);
  }

  return {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded as any,
    mode: 'cors',
    redirect: 'follow'
  } as RequestInit;
};

export function parseJwt(token: string): KeycloakToken | undefined {
  var base64Url = token.split('.')[1];
  if (!base64Url || !base64Url[1]) {
    console.error('ParseJwt failed, token invalid');
    return undefined;
  }
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}