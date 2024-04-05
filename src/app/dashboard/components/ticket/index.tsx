import { FiTrash2, FiFile} from 'react-icons/fi'

export function Ticket() {
    return(
        <>
            <tr className='border-b-2 border-b-slate-300 h-16 last:border-b-0 bg-slate-100 hover:bg-slate-300 duration-300'>
                <td className='text-left pl-1'>
                    Mercado
                </td>

                <td className='text-left hidden sm:table-cell'>
                    01/04/2024
                </td>

                <td className='text-left'>
                    <span className="bg-green-500 px-2 py-1 rounded">ABERTO</span>
                </td>

                <td className='text-left'>
                    <button className='mr-2'>
                        <FiTrash2 size={24} color='#ff2313' />
                    </button>
                    <button>
                        <FiFile size={24} color='#3b82f6' />
                    </button>
                </td>
            </tr>
        </>
    )
}