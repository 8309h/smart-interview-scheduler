import '../../styles/loader.css';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="loader-shell">
      <div className="loader-spinner" />
      <p>{message}</p>
    </div>
  );
};

export default Loader;
