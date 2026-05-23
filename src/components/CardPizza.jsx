import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../helpers/formatPrice';

const fallbackImg =
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80';

const CardPizza = ({ id, name, price, ingredients, img }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, img: img || fallbackImg });
  };

  return (
    <article className="card h-100 shadow-sm pizza-card">
      <img
        src={img || fallbackImg}
        className="card-img-top pizza-card-img"
        alt={`Pizza ${name}`}
        onError={(event) => {
          event.currentTarget.src = fallbackImg;
        }}
      />

      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5 fw-bold border-bottom pb-3 mb-3 text-capitalize">
          Pizza {name}
        </h3>

        <p className="text-center text-muted mb-2">Ingredientes:</p>

        <ul className="ingredients-ul border-bottom pb-3 mb-3">
          {ingredients.map((ingredient) => (
            <li key={`${id}-${ingredient}`} className="ingredient-li">
              🍕 {ingredient}
            </li>
          ))}
        </ul>

        <p className="text-center fw-bold fs-4 mb-4 mt-auto">
          Precio: ${formatPrice(price)}
        </p>

        <div className="d-flex gap-2 mt-auto">
          <Link className="btn btn-outline-dark btn-sm w-100" to={`/pizza/${id}`}>
            Ver más 👀
          </Link>

          <button
            type="button"
            className="btn btn-dark btn-sm w-100"
            onClick={handleAddToCart}
          >
            Añadir 🛒
          </button>
        </div>
      </div>
    </article>
  );
};

export default CardPizza;
