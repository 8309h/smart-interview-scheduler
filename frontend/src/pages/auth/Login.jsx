import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.jsx';
import authService from '../../services/authService.js';
import '../../styles/auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleContinueWithGoogle = () => {
    window.location.href = authService.getGoogleAuthUrl();
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">HireSync</div>
        <h1>Welcome to HireSync</h1>
        <p className="auth-copy">
          Automate interview scheduling, availability management, and candidate bookings from a single platform.
        </p>
        <button className="auth-button" type="button" onClick={handleContinueWithGoogle}>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
