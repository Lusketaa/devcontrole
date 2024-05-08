import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Ticket } from "./components/ticket";

import prismaClient from '@/lib/prisma'
 
export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/")
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      userId: session.user.id,
      status: 'Aberto'
    },
    include: {
        customer: true
    },
    orderBy: {
      created_at: 'desc'
    }
  })

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
                        {tickets.map(ticket => (
                            <Ticket key={ticket.id}
                            customer={ticket.customer}
                            ticket={ticket}
                        />
                        ))}
                    </tbody>
                </table>
                {tickets.length === 0 && (
                    <p className="text-center text-xl text-gray-500 mt-10">Nenhum chamado aberto</p>
                )}
            </main>
    </Container>
  )
}