import { useCallback, useMemo, useState } from 'react';
import { UserContext } from './UserContextDefinition';

const API_URL = 'http://localhost:5000/api';

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [email, setEmail] = useState(() => localStorage.getItem('email') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveSession = useCallback((sessionToken, sessionEmail) => {
    setToken(sessionToken);
    setEmail(sessionEmail);
    localStorage.setItem('token', sessionToken);
    localStorage.setItem('email', sessionEmail);
  }, []);

  const login = useCallback(async ({ email: userEmail, password }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas o usuario no registrado');
      }

      const data = await response.json();
      saveSession(data.token, data.email || userEmail);

      return data;
    } catch (loginError) {
      setError(loginError.message);
      throw loginError;
    } finally {
      setLoading(false);
    }
  }, [saveSession]);

  const register = useCallback(async ({ email: userEmail, password }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, password }),
      });

      if (!response.ok) {
        throw new Error('No se pudo registrar el usuario');
      }

      const data = await response.json();
      saveSession(data.token, data.email || userEmail);

      return data;
    } catch (registerError) {
      setError(registerError.message);
      throw registerError;
    } finally {
      setLoading(false);
    }
  }, [saveSession]);

  const logout = useCallback(() => {
    setToken(null);
    setEmail(null);
    setError(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }, []);

  const getProfile = useCallback(async () => {
    if (!token) {
      throw new Error('No existe token de autenticación');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('No se pudo obtener el perfil del usuario');
      }

      const data = await response.json();

      if (data.email) {
        setEmail(data.email);
        localStorage.setItem('email', data.email);
      }

      return data;
    } catch (profileError) {
      setError(profileError.message);
      throw profileError;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      email,
      loading,
      error,
      login,
      register,
      logout,
      getProfile,
    }),
    [token, email, loading, error, login, register, logout, getProfile]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
