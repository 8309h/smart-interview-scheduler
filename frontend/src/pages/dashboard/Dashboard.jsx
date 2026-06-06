import useAuth from '../../hooks/useAuth.jsx';
import '../../styles/dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-shell">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-welcome">Welcome Back,</p>
          <h1>{user?.name || 'Interview Coordinator'}</h1>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="profile-card">
          <img src={user?.profilePicture || 'https://via.placeholder.com/120?text=User'} alt={user?.name || 'User'} />
          <div>
            <h2>{user?.name || 'Unknown User'}</h2>
            <p>{user?.email || 'No email available'}</p>
            <span className="status-badge">Google Connected</span>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <p>Available Slots</p>
            <h3>0</h3>
          </div>
          <div className="stat-card">
            <p>Upcoming Interviews</p>
            <h3>0</h3>
          </div>
          <div className="stat-card">
            <p>Total Bookings</p>
            <h3>0</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
