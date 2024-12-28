import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma/prisma";
import authConfig from "./auth.config";
import { getUserById } from "./actions/user-actions";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      if (!user.id) return false;
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;
      const expiration = Math.floor(Date.now() / 1000) + 12 * 60 * 60;
      user.customExpiration = expiration;
      return true;
    },
    async jwt({ user, token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      if (user?.customExpiration) {
        token.expiration = user.customExpiration;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.customExpiration = token?.expiration as number;
      }

      return session;
    },
  },
});
