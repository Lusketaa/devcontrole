"use client"
import { useContext, useRef, MouseEvent } from "react"
import { ModalContext } from "@/providers/modal"

export function ModalTicket() {
    const { handleModal, ticket } = useContext(ModalContext);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleModalClickOutside = (event: MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            handleModal();
        }
    }

    return (
        <div className="absolute bg-gray-900/50 w-full min-h-screen" onClick={handleModalClickOutside}>
            <div className="absolute inset-0 flex items-center justify-center">

                <div ref={modalRef} className="bg-white shadow-lg w-4/5 max-w-2xl p-5 rounded">

                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-lg font-bold md:text-2xl">Detalhes do Chamado</h1>
                        <button className="bg-red-500 px-4 py-1 rounded text-white hover:bg-red-700 duration-300" onClick={handleModal}>
                            Fechar
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2 ">
                        <h2 className="font-bold">Nome:</h2>
                        <p>{ticket?.ticket.name}</p>
                    </div>

                    <div className="flex flex-wrap flex-col gap-1 mb-2 ">
                        <h2 className="font-bold">Descrição:</h2>
                        <p>{ticket?.ticket.description}</p>
                    </div>

                    <div className="w-full border-b-[1px] my-4"></div>
                    <h1 className="font-bold text-lg mb-4 md:text-2xl">Detalhes do cliente</h1>
                    
                    <div className="flex flex-wrap gap-1 mb-2 ">
                        <h2 className="font-bold">Nome:</h2>
                        <p>{ticket?.customer?.name}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2 ">
                        <h2 className="font-bold">Telefone:</h2>
                        <p>{ticket?.customer?.phone}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2 ">
                        <h2 className="font-bold">Email:</h2>
                        <p>{ticket?.customer?.email}</p>
                    </div>

                    {ticket?.customer?.address && (
                        <div className="flex flex-wrap gap-1 mb-2 ">
                        <h2 className="font-bold">Endereço:</h2>
                        <p>{ticket?.customer?.address}</p>
                    </div>
                    )}

                </div>
            </div>
        </div>
        
    )
}