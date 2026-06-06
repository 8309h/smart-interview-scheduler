import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import authService from '../../services/authService.js';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [message, setMessage] = useState('Finalizing login...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const runCallback = async () => {
      try {
        const token = searchParams.get('token');
        const code = searchParams.get('code');

        if (!token && !code) {
          throw new Error('Missing authentication token or authorization code.');
        }

        const authToken = token || (await authService.exchangeGoogleCode(code));
        if (!authToken) {
          throw new Error('Unable to retrieve authentication token.');
        }

        await login(authToken);
        navigate('/dashboard', { replace: true });
      } catch (err) {
        setError(err.message || 'Authentication failed.');
        setMessage('Unable to complete authentication.');
      }
    };

    runCallback();
  }, [searchParams, login, navigate]);

  if (error) {
    return <ErrorState title="Authentication Error" message={error} />;
  }

  return <Loader message={message} />;
};

export default AuthCallback;
