import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';

const Profile = () => {
  const { email, logout, getProfile, loading } = useUser();
  const [profileEmail, setProfileEmail] = useState(email || '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getProfile();
        setProfileEmail(profile.email || email || '');
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadProfile();
  }, [email, getProfile]);

  return (
    <main className="profile-page flex-grow-1">
      <section className="container py-5">
        <div className="card shadow-sm border-0 mx-auto profile-card">
          <div className="card-body p-4 p-md-5 text-center">
            <h1 className="fw-bold mb-3">Mi perfil</h1>
            <p className="text-muted mb-1">Usuario conectado:</p>
            <p className="fs-5 fw-semibold mb-4">
              {loading ? 'Cargando perfil...' : profileEmail}
            </p>

            {message && <p className="alert alert-warning py-2">{message}</p>}

            <button type="button" className="btn btn-dark" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
