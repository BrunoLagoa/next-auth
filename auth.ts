import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHubProvider from "next-auth/providers/github";
import ResendProvider from "next-auth/providers/resend";
import db from '@/lib/db';
import { compareSync } from 'bcrypt-ts';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: User & {
      githubProfile: any;
    }
  }
}

const prisma = new PrismaClient();

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // pages: {
  //   signIn: '/login',
  //   signOut: '/logout',
  // },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@exemplo.com.br',
        },
        password: {
          label: 'Senha',
          type: 'password',
          placeholder: 'senha',
        },
      },
      async authorize(credentials) {
        const email = credentials.email as string
        const password = credentials.password as string

        if (!email || !password) {
          return null
        }

        const user = await db.user.findUnique({
          where: { email: email },
        });

        if (!user) {
          return null
        }

        const passwordMatch = compareSync(password, user.password ?? '')

        if (!passwordMatch) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }
    }),
    GitHubProvider({
      allowDangerousEmailAccountLinking: true,
    }),
    ResendProvider({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: 'Acme <onboarding@resend.dev>',
    })
  ],
  callbacks: {
    jwt({ token, profile }) {
      return { githubProfile: profile, ...token }
    },
    session({ session, token }) {
      session.user.githubProfile = token.githubProfile

      return session
      // return { ...session, githubProfile: token.githubProfile }
    }
  }
});