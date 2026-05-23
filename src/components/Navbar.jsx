import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useUser } from '../hooks/useUser';
import { formatPrice } from '../helpers/formatPrice';

const Navbar = () => {
  const { total } = useCart();
  const { token, logout } = useUser();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <Link className="navbar-brand mb-0 h1" to="/">
            Pizzería Mamma Mía!
          </Link>

          <NavLink className="btn btn-outline-light btn-sm" to="/">
            🍕 Home
          </NavLink>

          {token ? (
            <>
              <NavLink className="btn btn-outline-light btn-sm" to="/profile">
                🔓 Profile
              </NavLink>

              <button
                type="button"
                className="btn btn-outline-warning btn-sm"
                onClick={logout}
              >
                🔒 Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className="btn btn-outline-light btn-sm" to="/login">
                🔐 Login
              </NavLink>

              <NavLink className="btn btn-outline-light btn-sm" to="/register">
                🔐 Register
              </NavLink>
            </>
          )}
        </div>

        <Link className="btn btn-outline-info btn-sm" to="/cart">
          🛒 Total: ${formatPrice(total)}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
