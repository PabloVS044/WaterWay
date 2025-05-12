import { login } from '@/services/auth';
import { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'WaterWay+ Auth',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { data, error } = await login(credentials);
        if (error) throw new Error(error.detail || 'Invalid credentials');
        if (!data) return null;

        // the authorization func requires that the returned value must be a "User"
        // Here inject the tokens to pass to the session handler for to use in the next steps
        return {
          ...data.user,
          role: data.user.role,
          accessToken: data.access,
          refreshToken: data.refresh,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        // extract the tokens injected in the previous step

        token.user = user;
        token.access = user.accessToken;
        token.refresh = user.refreshToken;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        token: {
          ...token,
          // clear jwt
          user: undefined,
        },
        user: {
          ...session.user,
          ...{
            ...token.user as Record<never, never>,
            // remove tokens from the user data
            access: undefined,
            refresh: undefined,
          },
        },
      };
    },
  },
};
