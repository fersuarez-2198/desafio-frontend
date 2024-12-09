import { useNavigate, useParams } from "react-router-dom";
import CardProductDetail from "../components/cardProductDetail/cardProductDetail";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetailsPage() {
    // Variables para obtener el id del item
    const { id } = useParams();
    // Variable para capturar la información de la búsqueda
    const [result, setResult] = useState([]);
    const [description, setDescription] = useState("");
    // Variable para capturar la información del path
    const [path, setPath] = useState([]);
    // Variable para visualizar un loader
    const [loading, setLoading] = useState(true);
    // Variable para capturar un posible error de servicio
    const [error, setError] = useState<string | null>(null);
    // Hook para navegar a la página anterior
    const navigate = useNavigate();

    // Función para consumir el servicio cada vez que haya algún cambio en el parámetro de búsqueda
    useEffect(() => {
        getProductById();
    }, [id]);

    const getProductById = () => {
        const fetchResults = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.mercadolibre.com/items/${encodeURIComponent(
                        id
                    )}`
                );
                setResult(response.data);
                generatePath(response.data.category_id);
                getProductDescription();
                setError(null);
            } catch (err) {
                setError("Hubo un error al cargar los resultados.");
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    };

    const generatePath = (path: string) => {
        const fetchResults = async () => {
            if (!path) return;
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.mercadolibre.com/categories/${encodeURIComponent(
                        path
                    )}`
                );
                setPath(response.data.path_from_root);
                setError(null);
            } catch (err) {
                setError("Hubo un error al cargar los resultados.");
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    };

    const getProductDescription = () => {
        const fetchResults = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.mercadolibre.com/items/${encodeURIComponent(
                        id
                    )}/description`
                );
                setDescription(response.data.plain_text);
                setError(null);
            } catch (err) {
                setError(
                    "Hubo un error al cargar la descripción del producto."
                );
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    };

    if (loading) return <p>Cargando resultados...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="details">
            <div className="navegacion">
                {/* Volver */}
                <a onClick={() => navigate(-1)}>Volver al listado</a>
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    {path.map((category, index) => (
                        <span key={category.id}>
                            {category.name}
                            {index < path.length - 1 && " > "}
                        </span>
                    ))}
                </nav>
            </div>

            {/* Card Product Detail */}
            <CardProductDetail data={{ result, description }} />
        </div>
    );
}

export default ProductDetailsPage;
