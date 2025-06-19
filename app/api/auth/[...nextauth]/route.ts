import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { email } from "zod/v4";
import { prismaClient } from "../../lib/db";

const handler = NextAuth({

  //Use google authentication
  
  providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
  })
],
  callbacks: {
    async signIn(params) {
      if (!params.user.email) {
        return false;
      }
      
      try {
        await prismaClient.user.create({
          data: {
            email: params.user.email,
            provider: "Google"
          }
        });
      } catch (e) {

      }
      return true;
    }
  }
})

export { handler as GET, handler as POST }

