import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pizzas as localPizzas } from '../data/pizzas';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../helpers/formatPrice';

const fallbackImg =
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80';

const Pizza = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPizza = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);

        if (!response.ok) {
          throw new Error('No se pudo obtener la pizza desde la API');
        }

        const data = await response.json();
        setPizza(data);
      } catch (error) {
        console.error('Error al obtener la pizza, se usarán datos locales:', error);
        const localPizza = localPizzas.find((item) => item.id === id);
        setPizza(localPizza || null);
      } finally {
        setLoading(false);
      }
    };

    getPizza();
  }, [id]);

  if (loading) {
    return (
      <main className="pizza-page d-flex align-items-center justify-content-center">
        <p className="fs-5">Cargando pizza...</p>
      </main>
    );
  }

  if (!pizza) {
    return (
      <main className="pizza-page d-flex align-items-center justify-content-center">
        <p className="fs-5">No se pudo cargar la pizza.</p>
      </main>
    );
  }

  return (
    <main className="pizza-page">
      <section className="container py-5">
        <div className="card shadow-sm border-0 overflow-hidden">
          <div className="row g-0">
            <div className="col-12 col-md-6">
              <img
                src={pizza.img || fallbackImg}
                alt={`Pizza ${pizza.name}`}
                className="img-fluid w-100 pizza-detail-img"
                onError={(event) => {
                  event.currentTarget.src = fallbackImg;
                }}
              />
            </div>

            <div className="col-12 col-md-6">
              <div className="card-body h-100 d-flex flex-column">
                <h2 className="card-title fw-bold border-bottom pb-3 mb-3 text-capitalize">
                  Pizza {pizza.name}
                </h2>

                <p className="card-text text-muted">{pizza.desc}</p>

                <p className="fw-semibold mb-2">Ingredientes:</p>

                <ul className="ingredients-ul mb-4">
                  {pizza.ingredients.map((ingredient) => (
                    <li key={`${pizza.id}-${ingredient}`} className="ingredient-li">
                      🍕 {ingredient}
                    </li>
                  ))}
                </ul>

                <p className="fw-bold fs-3 mt-auto mb-4">
                  Precio: ${formatPrice(pizza.price)}
                </p>

                <button
                  type="button"
                  className="btn btn-dark align-self-start"
                  onClick={() => addToCart({ ...pizza, img: pizza.img || fallbackImg })}
                >
                  Añadir 🛒
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Pizza;
