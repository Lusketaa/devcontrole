import { Container } from "@/components/container";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from '@/lib/prisma';

export default async function NewTicket() {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/");
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        }
    })

    async function handleRegisterTicket(formData: FormData) {
        "use server"

        const name = formData.get('name')
        const description = formData.get('description')
        const customerId = formData.get('customerId')

        if(!name || !description || !customerId) {
            return;
        }

        await prismaClient.ticket.create({
            data: {
                name: name as string,
                description: description as string,
                customerId: customerId as string,
                status: 'Aberto',
                userId: session?.user.id
            }
        })

        redirect('/dashboard');
    }

    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="bg-gray-900 px-4 py-1 text-white rounded hover:bg-slate-700 duration-300">
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">Novo Chamado</h1>
                </div>

                <form 
                    className="flex flex-col mt-6"
                    action={handleRegisterTicket}
                >
                    <label className="mb-1 font-medium text-lg">Nome do chamado</label>
                    <input
                        type="text"
                        placeholder="Digite o nome do chamado"
                        className="w-full p-2 rounded border border-gray-500"
                        required
                        name="name"
                    />

                    <label className="mb-1 font-medium text-lg">Descreva o problema</label>
                    <textarea
                        placeholder="Descreva o problema..."
                        className="w-full p-2 rounded border border-gray-500 h-24 resize-none"
                        required
                        name="description"
                    ></textarea>

                    {customers.length !== 0 && (
                        <>
                            <label className="mb-1 font-medium text-lg">Selecione o cliente</label>
                            <select 
                                className="w-full border-2 rounded-md h-11 mb-2 resize-none bg-white"
                                name="customerId"
                            >

                                {customers.map(customer => (
                                    <option 
                                        key={customer.id} 
                                        value={customer.id}>{customer.name}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    {customers.length === 0 && (
                        <Link href="/dashboard/customer/new">
                            Você ainda não tem nenhum cliente, <span className="text-blue-500 font-medium hover:text-blue-700 duration-300">Crie um aqui!</span>
                        </Link>
                    )}

                    <button 
                        className="bg-blue-500 px-4 py-2 my-4 text-white rounded hover:bg-blue-700 duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={customers.length === 0}
                    >
                        Abrir chamado
                    </button>
                    
                </form>
            </main>
        </Container>
    )
}