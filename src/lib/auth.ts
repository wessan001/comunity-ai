import { PrismaAdapter } from "@auth/prisma-adapter"
import { AuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) return null

        const passwordValid = await compare(credentials.password, user.password)
        if (!passwordValid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const getAuthSession = () => getServerSession(authOptions)
