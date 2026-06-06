import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import Login from '../pages/auth/Login.jsx';
import AuthCallback from '../pages/auth/Callback.jsx';
import NotFound from '../pages/NotFound.jsx';
import ProtectedRoute from '../components/common/ProtectedRoute.jsx';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
