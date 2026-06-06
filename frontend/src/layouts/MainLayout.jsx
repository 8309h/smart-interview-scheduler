import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar.jsx';
import Sidebar from '../components/common/Sidebar.jsx';
import '../styles/layout.css';

const MainLayout = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
      <footer className="app-footer">
        <p>HireSync © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default MainLayout;
