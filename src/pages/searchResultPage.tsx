import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ResultSearch from "../components/cardResult/cardResult";

function SearchResultsPage() {
    //Variables para obtener el item de búsqueda
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search");
    //Variable para capturar la información de la búsqueda
    const [results, setResults] = useState([]);
    //Variable para visualizar un loader
    const [loading, setLoading] = useState(true);
    //Variable para capturar un posible error de servicio
    const [error, setError] = useState<string | null>(null);

    //Función para consumir el servicio cada vez que haya algún cambio en el parámetro de búsqueda
    useEffect(() => {
        const fetchResults = async () => {
            if (!searchQuery) return;
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(
                        searchQuery
                    )}`
                );
                setResults(response.data.results);
                setError(null);
            } catch (err) {
                setError("Hubo un error al cargar los resultados.");
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [searchQuery]);

    if (loading) return <p>Cargando resultados...</p>;
    if (error) return <p>{error}</p>;

    return (
        <ResultSearch data={results} />
    );
}

export default SearchResultsPage;
