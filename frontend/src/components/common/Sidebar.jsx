import { Link } from 'react-router-dom';
import '../../styles/sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__section">
        <h3>Navigation</h3>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
