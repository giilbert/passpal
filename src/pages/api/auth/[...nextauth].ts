import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaClient } from '.prisma/client';
import { verify } from 'argon2';
import { userCredentialsSchema } from '@utils/patterns';

const prisma = new PrismaClient();

export default NextAuth({
  secret: process.env.JWT_SECRET,
  jwt: {
    signingKey: process.env.JWT_SIGNING_KEY,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) token.email = user.email;
      return token;
    },
    async session({ session, token }) {
      // expose user id and username
      if (token && session.user) {
        session.user.email = token.email as string;
        session.user.id = token.sub as string;
      }

      return Promise.resolve(session);
    },
  },
  providers: [
    Credentials({
      id: 'credentials',
      authorize: async (credentials: any) => {
        if (!(await userCredentialsSchema.isValid(credentials))) return;

        await prisma.$connect();

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null;

        await prisma.$disconnect();

        // check if passwords match
        if ((await verify(user.password, credentials.password)) === false)
          return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
});
