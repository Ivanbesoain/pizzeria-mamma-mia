import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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

    const { email, password, confirmPassword } = formData;

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setMessage('Todos los campos son obligatorios');
      return;
    }

    if (password.length < 6) {
      setMessage('El password debe tener al menos 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Los passwords no coinciden');
      return;
    }

    try {
      await register({ email, password });
      navigate('/');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main className="form-page">
      <section className="form-container">
        <h1 className="form-title">Register</h1>

        <form onSubmit={handleSubmit} className="form-card">
          <div className="mb-3">
            <label htmlFor="register-email" className="form-label">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              name="email"
              className="form-control"
              placeholder="Ingresa tu email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="register-password" className="form-label">
              Contraseña
            </label>
            <input
              id="register-password"
              type="password"
              name="password"
              className="form-control"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="register-confirm-password" className="form-label">
              Confirmar contraseña
            </label>
            <input
              id="register-confirm-password"
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirma tu contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {message && <p className="alert alert-warning py-2">{message}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Registrando...' : 'Register'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default RegisterPage;
