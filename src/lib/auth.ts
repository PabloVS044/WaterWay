import Auth0Provider from "next-auth/providers/auth0";
import { NextAuthOptions } from "next-auth";
import { Role } from "../../next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_DOMAIN,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.roles = token.roles as Role[] || [];
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Extract roles from namespaced claim
        console.log(profile)
        const claims = profile as never;
        token.roles = claims["https://waterway.dev/roles"] || [];
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH0_SECRET,
};
