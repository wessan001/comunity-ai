import RegisterForm from "@/components/RegisterForm"

export default function CadastroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
      <div className="w-full max-w-md backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Cadastro</h1>
        <RegisterForm />
      </div>
    </div>
  )
}
