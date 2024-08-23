
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface DefaultSession {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      
      id: string;
      
      role: string;
    } & DefaultSession["user"];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {

    userId: string;

    role: string;
  }
}
