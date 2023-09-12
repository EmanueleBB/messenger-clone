import bcrypt from "bcrypt";
import NextAuth, {AuthOptions} from "next-auth";
import { CredentialsProvider } from "next-auth/providers";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/libs/prismadb"


//Using next-auth and prisma comes with the need of using prismaAdapter. This is the basic syntax

// const prisma = new PrismaClient() => we are importing it from libs, where we also put the case for the development environment

// export default NextAuth({
//   providers: [
//     Providers.Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
// })

export const authOptions : AuthOptions = {
   adapter: PrismaAdapter(prisma),
   providers:[
      GithubProvider({
         clientId:process.env.GITHUB_ID as string,
         clientSecret:process.env.GITHUB_SECRET as string,
      })
   ]
}