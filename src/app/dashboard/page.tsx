import { redirect } from "next/navigation"
import { auth } from "@/lib/auth-config"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Welcome back, {session.user?.name || session.user?.email}!
        </p>
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Your bio pages will appear here.</p>
        </div>
      </div>
    </div>
  )
}
