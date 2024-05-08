"use client"

import { createContext, ReactNode, useState } from "react"
import { TicketProps } from "@/utils/ticket.type"
import { CustomerProps } from "@/utils/customer.type"
import { ModalTicket } from "@/components/modal"

interface ModalProviderProps {
    visible: boolean;
    handleModal: () => void;
    ticket: TicketInfo | undefined;
    setDetailTicket: (ticket: TicketInfo) => void;
}

interface TicketInfo {
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export const ModalContext = createContext({} as ModalProviderProps)

export function ModalProvider( { children }: { children: ReactNode } ) {
    const [visible, setVisible] = useState(false);
    const [ticket, setTicket] = useState<TicketInfo>();

    function handleModal() {
        setVisible(!visible)
    }

    function setDetailTicket(ticket: TicketInfo) {
        setTicket(ticket);
    }

    return (
        <ModalContext.Provider value={{ visible, handleModal, ticket, setDetailTicket }}>
            {visible && <ModalTicket />}
            {children}
        </ModalContext.Provider>
    )
}