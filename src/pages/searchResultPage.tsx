import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ResultSearch from "../components/cardResult/cardResult";

function SearchResultsPage() {
    // Variables para obtener el parámetro de búsqueda
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search");

    // Estados para manejar los resultados, paginación, y estado de la UI
    const [results, setResults] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas posibles
    const [loading, setLoading] = useState(false); // Mostrar loader
    const [error, setError] = useState<string | null>(null); // Capturar errores
    const ITEMS_PER_PAGE = 10; // Ítems por página
    const API_LIMIT = 50; // Máximo de resultados por llamada a la API

    // Función para consumir la API
    const fetchResults = async (offset: number) => {
        if (!searchQuery) return;
        try {
            setLoading(true);
            const response = await axios.get(
                `https://api.mercadolibre.com/sites/MLA/search?offset=${offset}&q=${encodeURIComponent(searchQuery)}`
            );

            const newResults = response.data.results;
            setResults((prevResults) => [...prevResults, ...newResults]);
            setTotalPages(Math.ceil(response.data.paging.total / ITEMS_PER_PAGE));
            setError(null);
        } catch (err) {
            setError("Hubo un error al cargar los resultados.");
        } finally {
            setLoading(false);
        }
    };

    // Efecto para cargar resultados al cambiar la búsqueda
    useEffect(() => {
        setResults([]);
        setCurrentPage(1);
        if (searchQuery) fetchResults(0);
    }, [searchQuery]);

    // Calcular el índice de inicio y fin para mostrar ítems paginados
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentResults = results.slice(startIndex, endIndex);

    // Manejar el cambio de página
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;

        setCurrentPage(page);

        // Cargar más resultados si es necesario
        if (page * ITEMS_PER_PAGE > results.length && results.length % API_LIMIT === 0) {
            const nextOffset = results.length;
            fetchResults(nextOffset);
        }
    };

    // Generar botones de paginación
    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`pagination-button ${i === currentPage ? "active" : ""}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    if (loading && results.length === 0) return <p>Cargando resultados...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <ResultSearch data={currentResults} />
            <div className="pagination-controls">
                {currentPage > 1 && (
                    <button
                        className="control-button"
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        {"< "}Anterior
                    </button>
                )}
                {renderPaginationButtons()}
                {currentPage < totalPages && (
                    <button
                        className="control-button"
                        onClick={() => handlePageChange(currentPage + 1)}
                    >

                        Siguiente  {" >"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default SearchResultsPage;
