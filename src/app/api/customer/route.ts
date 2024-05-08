import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from '@/lib/prisma'

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({message: 'Unauthorized'}, {status: 401})
    }

    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id'); 

    if (!id) {
        return NextResponse.json({message: 'Failed deleting customer'}, {status: 400})
    }

    const findTiclets = await prismaClient.ticket.findFirst({
        where: {
            customerId: id as string
        }
    })

    if (findTiclets) {
        return NextResponse.json({message: 'Failed deleting customer'}, {status: 400})
    }

    try {
        await prismaClient.customer.delete({
            where: {
                id: id as string
            }
        })

        return NextResponse.json({message: 'Cliente deletado com sucesso'});
    } catch (error) {
        return NextResponse.json({message: 'Failed deleting customer'}, {status: 400})
    }
}

// Rota para cadastro do cliente
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({message: 'Unauthorized'}, {status: 401})
    }

    const {name, phone, email, address, userId} = await request.json();

    try {
        await prismaClient.customer.create({
            data: {
                name,
                phone,
                email,
                address: address ? address : "",
                userId: userId
            }
        })

        return NextResponse.json({message: 'ok'})
    } catch (error) {
        return NextResponse.json({message: 'Failed creating customer'}, {status: 400})
    }
}