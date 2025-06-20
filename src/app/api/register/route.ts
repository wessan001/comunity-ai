import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Campos obrigatórios não preenchidos." },
        { status: 400 }
      )
    }

    const userExists = await prisma.user.findUnique({ where: { email } })

    if (userExists) {
      return NextResponse.json(
        { message: "Já existe uma conta com este e-mail." },
        { status: 409 }
      )
    }

    const hashedPassword = await hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: "Usuário criado com sucesso." }, { status: 201 })
  } catch (error) {
    console.error("Erro ao cadastrar:", error)
    return NextResponse.json({ message: "Erro interno no servidor." }, { status: 500 })
  }
}
