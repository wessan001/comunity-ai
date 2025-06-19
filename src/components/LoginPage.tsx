'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password
    })

    if (result?.error) {
      setError("Email ou senha incorretos.")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
      <div className="w-full max-w-md backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">ComunityAI</h1>

        <form onSubmit={handleLogin} className="space-y-5">
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-600 bg-[#2a2a2a] text-white px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="********"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="text-right mt-2">
              <a href="/esqueci-senha" className="text-sm text-cyan-400 hover:underline">
                Esqueci minha senha
              </a>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Ainda não tem conta?{" "}
          <a href="/cadastro" className="text-cyan-400 hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  )
}
