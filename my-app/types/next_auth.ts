
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      
      id: string;
    
      role: string;

      token:string
      
    } & DefaultSession["user"];
  }
}
interface DefaultSession {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
}

declare module "next-auth/jwt" {
  interface JWT {

    userId: string;
    role: string;
    token: string;

  }
}
