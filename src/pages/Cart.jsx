import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../helpers/formatPrice';
import { useUser } from '../hooks/useUser';

const API_URL = 'http://localhost:5000/api';

const Cart = () => {
  const { cart, total, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { token } = useUser();
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    setCheckoutMessage('');

    if (!token) {
      setCheckoutMessage('Debes iniciar sesión para pagar.');
      return;
    }

    if (cart.length === 0) {
      setCheckoutMessage('Tu carrito está vacío.');
      return;
    }

    setCheckoutLoading(true);

    try {
      const response = await fetch(`${API_URL}/checkouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      });

      if (!response.ok) {
        throw new Error('No se pudo realizar la compra');
      }

      setCheckoutMessage('Compra realizada con éxito. ¡Gracias por tu pedido!');
    } catch (error) {
      setCheckoutMessage(error.message);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <main className="cart-page">
      <section className="cart-container card shadow-sm border-0">
        <div className="card-body p-4 p-md-5">
          <h2 className="cart-title mb-4">Detalles del pedido:</h2>

          {cart.length === 0 ? (
            <p className="text-muted mb-4">Tu carrito está vacío.</p>
          ) : (
            <>
              {cart.map((pizza) => (
                <article key={pizza.id} className="cart-item">
                  <div className="cart-item-info">
                    <img
                      src={pizza.img}
                      alt={`Pizza ${pizza.name}`}
                      className="cart-item-img"
                    />
                    <span className="cart-item-name">{pizza.name}</span>
                  </div>

                  <div className="cart-item-actions">
                    <span className="cart-item-price">
                      ${formatPrice(pizza.price * pizza.count)}
                    </span>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm cart-action-btn"
                      onClick={() => decreaseQuantity(pizza.id)}
                    >
                      -
                    </button>

                    <span className="cart-item-count">{pizza.count}</span>

                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm cart-action-btn"
                      onClick={() => increaseQuantity(pizza.id)}
                    >
                      +
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => removeFromCart(pizza.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}

              <h3 className="cart-total mt-4">Total: ${formatPrice(total)}</h3>

              <button
                type="button"
                className="btn btn-dark mt-2"
                disabled={!token || checkoutLoading}
                onClick={handleCheckout}
              >
                {checkoutLoading ? 'Procesando...' : 'Pagar'}
              </button>

              {!token && (
                <p className="text-muted small mt-2 mb-0">
                  Debes iniciar sesión para pagar.
                </p>
              )}

              {checkoutMessage && (
                <p className="alert alert-info py-2 mt-3 mb-0">{checkoutMessage}</p>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Cart;
