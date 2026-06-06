import { Link } from 'react-router-dom';
import '../../styles/navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/">HireSync</Link>
      </div>
      <nav className="navbar__links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Navbar;
