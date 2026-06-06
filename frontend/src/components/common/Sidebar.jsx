import { NavLink } from 'react-router-dom';
import '../../styles/sidebar.css';

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Availability', path: '/dashboard', disabled: true },
  { label: 'Slots', path: '/dashboard', disabled: true },
  { label: 'Bookings', path: '/dashboard', disabled: true },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__section">
        <h3>Main Menu</h3>
        <ul>
          {navItems.map((item) => (
            <li key={item.label} className={item.disabled ? 'disabled' : ''}>
              {item.disabled ? (
                <span>{item.label} <small>Coming Soon</small></span>
              ) : (
                <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={item.path}>
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
