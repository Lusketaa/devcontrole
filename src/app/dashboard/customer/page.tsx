import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

import Link from "next/link";
import { Card } from "./components/card";
import prismaClient from '@/lib/prisma';

export default async function Customer() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        }
    })
    
    return(
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Meus Clientes</h1>
                    <Link href="/dashboard/customer/new" className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 duration-300">
                        Novo cliente
                    </Link>
                </div>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                    {
                        customers.map(customer => (
                            <Card 
                                key={customer.id}
                                customer={customer}
                            />
                        ))}     
                </section>
                {customers.length === 0 && <p className="text-center text-xl text-gray-500 mt-10">Nenhum cliente encontrado</p>}
            </main>
        </Container>
    )
}