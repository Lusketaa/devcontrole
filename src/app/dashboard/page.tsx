import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Ticket } from "./components/ticket";

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/")
  }


  return (
    <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Chamados</h1>
                    <Link href="/dashboard/new" className="bg-blue-500 px-4 py-1 rounded text-white hover:bg-blue-700 duration-300">
                        Abrir chamado
                    </Link>
                </div>

                <table className="min-w-full my-2">
                    <thead>
                        <tr className="my-1">
                            <th className="font-medium text-left PL-1">CLIENTE</th>
                            <th className="font-medium text-left hidden sm:block">DATA CADASTRO</th>
                            <th className="font-medium text-left">STATUS</th>
                            <th className="font-medium text-left">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Ticket />
                        <Ticket />
                    </tbody>
                </table>
            </main>
    </Container>
  )
}