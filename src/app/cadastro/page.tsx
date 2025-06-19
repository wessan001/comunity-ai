'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CadastroPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Erro ao cadastrar")
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
      <div className="w-full max-w-md backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Criar Conta</h1>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300">Nome completo</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-600 bg-[#2a2a2a] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-600 bg-[#2a2a2a] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-600 bg-[#2a2a2a] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="********"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Repetir senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-600 bg-[#2a2a2a] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="********"
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Já tem conta?{" "}
          <a href="/login" className="text-cyan-400 hover:underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  )
}