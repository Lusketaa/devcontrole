import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from '@/lib/prisma'

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({message: 'Unauthorized'}, {status: 401})
    }

    const { id } = await request.json();

    const ticket = await prismaClient.ticket.findFirst({
        where: {
            id: id as string
        }
    })

    if (!ticket) {
        return NextResponse.json({message: 'Ticket not found'}, {status: 404})
    }

    try {
        await prismaClient.ticket.update({
            where: {
                id: id as string
            },
            data: {
                status: 'Fechado'
            }
        })

        return NextResponse.json({message: 'Ticket updated'}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Failed updating ticket'}, {status: 400})
    }
}