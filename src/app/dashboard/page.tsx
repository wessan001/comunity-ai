import { getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getAuthSession()

  if (!session || !session.user) {
    return redirect("/login")
  }

  const user = session.user

  return (
    <main className="min-h-screen bg-[#111827] text-white flex flex-col items-center justify-start px-6 py-10">
      <div className="w-full max-w-4xl rounded-2xl border border-cyan-500/20 bg-white/5 p-8 shadow-[0_0_30px_#06b6d4] backdrop-blur-md">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-cyan-400">Bem-vindo, {user.name || "usuário"} 👋</h1>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>

          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Sair
            </button>
          </form>
        </header>

        <section className="mt-4">
          <h2 className="text-xl font-semibold mb-4">Painel VIP</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-[#1f2937] p-5 border border-cyan-500/10 hover:border-cyan-500 transition">
              <h3 className="text-cyan-400 font-bold mb-2">Seu Grupo</h3>
              <p className="text-gray-300 text-sm">Aqui você poderá visualizar e gerenciar seu grupo VIP futuramente.</p>
            </div>

            <div className="rounded-xl bg-[#1f2937] p-5 border border-cyan-500/10 hover:border-cyan-500 transition">
              <h3 className="text-cyan-400 font-bold mb-2">Configurações</h3>
              <p className="text-gray-300 text-sm">Personalize o comportamento do seu bot.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
