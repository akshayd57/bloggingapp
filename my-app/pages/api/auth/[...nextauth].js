import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log("..credentials", credentials);

        try {
          const response = await fetch("http://localhost:3001/users/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password, 
            }),
          });

          if (!response.ok) {
            
            console.log("error")
          
          }

          let user = await response.json();

          user=user.data
          console.log(".....user", user);

          if (user && user.token) {
            return {
              id: user.userId,
              role: user.role,
              token: user.token,
              email:user.email
            };
          } else {
            console.log("Invalid credentials");
            return null;
          }
        } catch (error) {
          console.log()
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    
    async jwt({ token, user }) {
      console.log(".....user",user);
      console.log(".....tt",token)
      if (user) {
        token.id = user.userId;
        token.role = user.role;
        token.token = user.token;
        token.email=user.email
      }
    
      return token;
    },
    async session({ session, token }) {

      console.log(".....tokens",token)
      if (token) {
        session.user= {
          id: token.id,
          role: token.role,
          token: token.token,
          email:token.email
        };
      }
      console.log('.....sesssions',session)
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error', 
  },
});
