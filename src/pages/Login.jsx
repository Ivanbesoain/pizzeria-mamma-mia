import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
      setMessage('Todos los campos son obligatorios');
      return;
    }

    if (password.length < 6) {
      setMessage('El password debe tener al menos 6 caracteres');
      return;
    }

    try {
      await login({ email, password });
      navigate('/');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main className="form-page">
      <section className="form-container">
        <h1 className="form-title">Login</h1>

        <form onSubmit={handleSubmit} className="form-card">
          <div className="mb-3">
            <label htmlFor="login-email" className="form-label">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              name="email"
              className="form-control"
              placeholder="Ingresa tu email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              name="password"
              className="form-control"
              placeholder="Ingresa tu password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {message && <p className="alert alert-warning py-2">{message}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Ingresando...' : 'Login'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
