import { PrismaClient } from "@prisma/client";

//In this file we create the prisma client that we will use to operate on the database

declare global{
   var prisma: PrismaClient | undefined;
}

// if a client already exists, we use that. If not, we create a new one 
const client = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;