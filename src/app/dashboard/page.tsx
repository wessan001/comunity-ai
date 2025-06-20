"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <p className="text-gray-300">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg text-gray-300 mb-8">
          Olá, {session?.user?.name || "Usuário"}! Bem-vindo à sua área de gestão de bots.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-xl bg-white/5 border border-white/10 p-6 hover:border-cyan-500 transition">
            <h2 className="text-xl font-semibold mb-2">📦 Criar novo Bot</h2>
            <p className="text-gray-400">Comece um novo grupo VIP com um bot personalizado.</p>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-6 hover:border-cyan-500 transition">
            <h2 className="text-xl font-semibold mb-2">📊 Vendas e Taxas</h2>
            <p className="text-gray-400">Visualize o faturamento e taxas aplicadas por bot.</p>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-6 hover:border-cyan-500 transition">
            <h2 className="text-xl font-semibold mb-2">👥 Gerenciar usuários</h2>
            <p className="text-gray-400">Adicione ou remova membros dos grupos VIP.</p>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-6 hover:border-cyan-500 transition">
            <h2 className="text-xl font-semibold mb-2">⚙️ Configurações</h2>
            <p className="text-gray-400">Atualize informações da conta e preferências.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
