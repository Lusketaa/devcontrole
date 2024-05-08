'use client'

import { useContext } from 'react'
import { FiFile, FiCheckSquare} from 'react-icons/fi'
import { CustomerProps } from '@/utils/customer.type'
import { TicketProps } from '@/utils/ticket.type'
import { useRouter } from 'next/navigation'
import { ModalContext } from '@/providers/modal'

import { api } from '@/lib/api'

interface TicketItemProps {
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export function Ticket({ ticket, customer }: TicketItemProps) {
    const router = useRouter();
    const { handleModal, setDetailTicket } = useContext(ModalContext);

    async function handleChangeStatus() {
        try {
            const response = await api.patch("/api/ticket", {
                id: ticket.id,
            })

            router.refresh();
        } catch (error) {
            
        }
    }

    function handleOpenModal() {
        handleModal();
        setDetailTicket({
            customer: customer,
            ticket: ticket
        });
    }

    return(
        <>
            <tr className='border-b-2 border-b-slate-300 h-16 last:border-b-0 bg-slate-100 hover:bg-slate-300 duration-300'>
                <td className='text-left pl-1'>
                    {customer?.name}
                </td>

                <td className='text-left hidden sm:table-cell'>
                    {ticket.created_at?.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </td>

                <td className='text-left'>
                    <span className="bg-green-500 px-2 py-1 rounded">{ ticket.status }</span>
                </td>

                <td className='text-left'>
                    <button className='mr-3' onClick={handleChangeStatus}>
                        <FiCheckSquare size={24} color='#686363' />
                    </button>
                    <button onClick={handleOpenModal}>
                        <FiFile size={24} color='#3b82f6' />
                    </button>
                </td>
            </tr>
        </>
    )
}