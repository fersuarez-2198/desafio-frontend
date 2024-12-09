import './cardResult.scss';

interface Product {
    id: string;
    title: string;
    sale_price: { amount: number, regular_amount: number };
    thumbnail: string;
    shipping: { free_shipping: boolean };
    installments?: { quantity: number; amount: number };
    seller: { id: number; nickname: string };
    condition: string;
}

interface ResultSearchProps {
    data: Product[];
}

function ResultSearch({ data }: ResultSearchProps) {

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="card-container">
            {data.map((product) => (
                <div key={product.id} className="card">
                    <div className="card-image">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                        />
                    </div>
                    <div className="card-content">
                        <h2 className="card-title">{product.title}</h2>
                        <h3 className="card-seller">Por {product.seller.nickname}</h3>
                        <div className="card-infoprice">
                            {(product.sale_price.regular_amount && product.sale_price.regular_amount !== 0) && (
                                <p className="card-regular-price">
                                    <del>{formatCurrency(product.sale_price.regular_amount)}</del>
                                </p>
                            )}
                            <p className="card-price">{formatCurrency(product.sale_price.amount)}</p>
                            {product.installments && (
                                <p className="card-cuotas">
                                    {`en ${product.installments.quantity} cuotas de $${product.installments.amount.toFixed(
                                        3
                                    )}`}
                                </p>
                            )}
                        </div>
                        {product.shipping.free_shipping && (
                            <p className="card-envio">Envío gratis</p>
                        )}
                        <p className="card-condition">
                            {product.condition === 'new' ? 'Nuevo' : 'Usado'}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ResultSearch;
