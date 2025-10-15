import { redirect } from "next/navigation"
import { auth } from "@/lib/auth-config"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Painel</h1>
        <p className="text-slate-600 mb-8 text-lg">
          Bem-vindo de volta, {session.user?.name || session.user?.email}!
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <p className="text-slate-600">Suas páginas bio aparecerão aqui.</p>
        </div>
      </div>
    </div>
  )
}
