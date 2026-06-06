import '../../styles/error.css';

const ErrorState = ({ title = 'Something went wrong', message }) => {
  return (
    <div className="error-shell">
      <div className="error-card">
        <h2>{title}</h2>
        <p>{message || 'Please try again later.'}</p>
      </div>
    </div>
  );
};

export default ErrorState;
