import { useParams } from "react-router-dom";

function ProductDetailsPage() {
    const { id } = useParams();

    return (
        <div>
            <h1>Detalle del Producto</h1>
            <p>Producto ID: {id}</p>
            {/* Aquí cargarías los detalles del producto según el ID */}
        </div>
    );
}

export default ProductDetailsPage;
