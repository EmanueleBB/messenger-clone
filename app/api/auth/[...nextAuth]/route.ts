import bcrypt from "bcrypt";
import NextAuth, {AuthOptions} from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
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
      }),
      GoogleProvider({
         clientId:process.env.GOOGLE_CLIENT_ID as string,
         clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      CredentialsProvider({
         name:'credentials',
         credentials:{
            email:{ label:'email', type:'text'},
            password:{ label:'password', type:'password'},
         },
         async authorize(credentials){
            if(!credentials?.email || !credentials?.password){
               throw new Error('Invalid Credentials');
            }

            const user = await prisma.user.findUnique({
               where:{
                  email:credentials.email
               }
            });

            //This happens if the user doesn't exist or if he signed up with Google or Github (so he doesn't have an explicit password to type out)
            if(!user || !user?.hashedPassword){
               throw new Error('Invalid credentials')
            }


            //in the database we have an hashedPassword, that we still have to create through the form. The await is needed in order to make isCorrectPassword a boolean an not a Promise<boolean>
            const isCorrectPassword = await bcrypt.compare(
               credentials.password,
               user.hashedPassword
            );

            if(!isCorrectPassword){
               throw new Error('Invalid credentials')
            }

            return user;
         }
      })
   ],

   debug: process.env.NODE_ENV === 'development',
   session:{
      strategy:"jwt"
   },
   secret:process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

//This is a new Next JS requirement
export {handler as GET, handler as POST}