import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="not-found-page flex-grow-1 d-flex align-items-center">
      <section className="container py-5 text-center">
        <div className="card shadow-sm border-0 mx-auto not-found-card">
          <div className="card-body p-4 p-md-5">
            <span className="not-found-emoji" aria-hidden="true">🍕</span>
            <h1 className="fw-bold mt-3 mb-3">404 - Página no encontrada</h1>
            <p className="text-muted mb-4">
              Parece que esta pizza no está en nuestro menú.
            </p>
            <Link className="btn btn-dark" to="/">
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
