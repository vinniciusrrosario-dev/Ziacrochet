import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import ManageProductsPage from './pages/admin/ManageProductsPage';
import ManageDeliveredWorksPage from './pages/admin/ManageDeliveredWorksPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="products" element={<ManageProductsPage />} />
              <Route path="delivered-works" element={<ManageDeliveredWorksPage />} />
            </Route>
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
