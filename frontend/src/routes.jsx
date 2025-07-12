import { Route } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageSongs from './pages/admin/Songs';
import ManageUsers from './pages/admin/Users';
import ModerateReviews from './pages/admin/Reviews';
import ManageFields from './pages/admin/Fields';
import Analytics from './pages/admin/Analytics';
import RequireAdmin from './auth/RequireAdmin';
import AdminLogin from './pages/admin/Login';

// Example usage in a <Routes> block:
<Routes>
  <Route path="/admin/login" element={<AdminLogin />} />

  <Route path="/admin" element={<RequireAdmin />}>
    <Route element={<AdminLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="songs" element={<ManageSongs />} />
      <Route path="users" element={<ManageUsers />} />
      <Route path="reviews" element={<ModerateReviews />} />
      <Route path="fields" element={<ManageFields />} />
      <Route path="analytics" element={<Analytics />} />
    </Route>
  </Route>
</Routes>
