// src/app/api/register/route.ts
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 })
    }

    const hashedPassword = await hash(password, 10)

await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro no cadastro:", error)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
