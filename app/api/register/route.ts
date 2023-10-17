import bcrypt from "bcrypt"

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
   request:Request
){
   try{
      const body = await request.json();
      const {
         email,
         name,
         password,
      } = body;

      //first we make sure that all the field are full
      if(!email || !name || !password){
         
         return new NextResponse('Missing infos', {status:400})
      }

      //Then we hash the password, as required in the NextAuth
      const hashedPassword = await bcrypt.hash(password,12);

      const user = await prisma.user.create({
         data:{
            email,
            name,
            hashedPassword
         }
      });

      //if we use .json we don't have to put the new keyword after the return
      return NextResponse.json(user);

   }catch(error){
      console.log(error, 'REGISTRATION ERROR')
      return new NextResponse('Internal Error', {status:500});
   }
}

