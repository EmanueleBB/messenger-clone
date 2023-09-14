'use client'
import { SessionProvider } from "next-auth/react"

interface AuthContextProps {
   children:React.ReactNode;
}

//We need the provider for the session

export default function AuthContext({
children
}:AuthContextProps){
   return <SessionProvider>{children}</SessionProvider>
}