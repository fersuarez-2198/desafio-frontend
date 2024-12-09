import './cardProductDetail.scss';

import { useState } from "react";

function CardProductDetail({ data }: { data: { result: any; description: string } }) {
    const { result, description } = data;

    const [selectedImage, setSelectedImage] = useState(result.pictures[0]?.secure_url);

    const displayedAttributes = result.attributes.slice(0, 5);

    //Función para formatear el valor
    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(value);
    };
    return (
        <div className="card-container">
            <div className="card">
                <div className="card-first">
                    {/* Detalles del producto (para pantallas menores a 1250px) */}
                    <div className="card-details-mobile">
                        <p className="condition">
                            {result.condition === "new" ? "Nuevo" : "Usado"} | {result.initial_quantity} restantes
                        </p>
                        <h1>{result.title}</h1>
                    </div>

                    {/* Columna de miniaturas */}
                    <div className="card-images">
                        {result.pictures.map((picture: { secure_url: string }, index: number) => (
                            <img
                                key={index}
                                src={picture.secure_url}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => setSelectedImage(picture.secure_url)}
                                className={`thumbnail ${selectedImage === picture.secure_url ? "selected" : ""}`}
                            />
                        ))}
                    </div>

                    {/* Imagen principal */}
                    <div className="card-image-big">
                        <img src={selectedImage} alt="Selected product" />
                    </div>

                    {/* Detalles del producto (para pantallas mayores a 1250px) */}
                    <div className="card-details">
                        <p className="condition">
                            {result.condition === "new" ? "Nuevo" : "Usado"} | {result.initial_quantity} restantes
                        </p>
                        <h1>{result.title}</h1>
                        <p className="price">{formatCurrency(result.price)}</p>
                        <p className="cuotas">cuotas</p>
                        {result.shipping.free_shipping && (
                            <p className="envio">Envío gratis</p>
                        )}
                        {/* Mostrar los atributos */}
                        <div className="attributes">
                            {displayedAttributes.map((attr: any) => (
                                <p key={attr.id} className="attribute">
                                    {attr.name}: <strong>{attr.value_name || "No especificado"}</strong>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Descripción del producto */}
                <div className="card-description">
                    <h2>Descripción</h2>
                    <p>{description}</p>
                </div>

            </div>
        </div>
    );
}

export default CardProductDetail;
