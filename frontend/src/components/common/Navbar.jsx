import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.jsx';
import '../../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/dashboard">HireSync</Link>
      </div>
      <div className="navbar__user">
        {user && (
          <>
            <img
              src={user.profilePicture || 'https://via.placeholder.com/38?text=U'}
              alt={user.name}
              className="navbar__avatar"
            />
            <span>{user.name}</span>
          </>
        )}
        <button className="navbar__logout" type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
