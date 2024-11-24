import NextAuth from "next-auth";
import { getUserById } from "./actions/user-actions";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma/prisma";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.customExpiration = token?.expiration as number;
      }

      return session;
    },
    // async jwt({ token, user }) {
    //   if (!token.sub) return token;

    //   const existingUser = await getUserById(token.sub);

    //   if (!existingUser) return token;

    //   if (user?.customExpiration) {
    //     token.expiration = user.customExpiration;
    //   }
    //   return token;
    // },
    // async signIn({ user, account }) {
    //   if (account?.provider !== "credentials") return true;
    //   if (!user.id) return false;
    //   const userExit = await getUserById(user.id);
    //   if (!userExit) return false;
    //   if (!userExit?.emailVerified) return false;
    //   const expiration = Math.floor(Date.now() / 1000) + 12 * 60 * 60;
    //   user.customExpiration = expiration;
    //   return true;
    // },
  },
});
