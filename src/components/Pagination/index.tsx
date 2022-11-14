import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

type Props = {
    limit: number,
    total: number,
    offset: number,
    pageActive: number,
    setPage: (value: number) => void,
    setOffset: (value: number) => void,
}
export default function Pagination({ limit, total, offset,setOffset, setPage, pageActive}: Props) {
    const MAX_ITEMS = 9;
    const MAX_LEFT = (MAX_ITEMS - 1) / 2;
    const currentPage = offset ? (offset / limit) + 1 : 1; // Para saber minha pagina atual
    const pages = Math.ceil(total / limit); //Verifica o total de paginas
    const maxFirst = Math.max(currentPage - MAX_LEFT, 1);
    const first = Math.min(
        Math.max(currentPage - MAX_LEFT, 1),
        maxFirst
    );

    function onPageChange(page: number) {
        setOffset((page - 1) * limit);
        setPage(page);
    }
    
    const pageActiveStyle = "relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20";
    const pageInativeStyle = "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"

    return (
        <>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Proximo
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Página <span className="font-medium">{pageActive}</span> de <span className="font-medium">{total}</span>{' '}itens
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                                onClick={() => onPageChange(currentPage - 1)}
                                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                <span className="sr-only">Anterior</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            {
                                Array.from({ length: Math.min(MAX_ITEMS, pages) })
                                    .map((_, index) => index + first)
                                    .map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => onPageChange(page)}
                                            aria-current="page"
                                            className={
                                                page == pageActive
                                                    ? pageActiveStyle
                                                    : pageInativeStyle
                                            }
                                        >
                                           {page}
                                        </button>
                                    ))
                                
                            }
          
                           
                            <button
                                onClick={() => onPageChange(currentPage + 1)}
                                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                <span className="sr-only">Proximo</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}   