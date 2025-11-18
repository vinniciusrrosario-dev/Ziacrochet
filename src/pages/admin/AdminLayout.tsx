import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminLayout = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
      isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:text-gray-900'
    }`;

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <NavLink to="/" className="flex items-center gap-2 font-semibold font-serif">
              <ShoppingBag className="h-6 w-6 text-brand-green" />
              <span>Zia Crochet</span>
            </NavLink>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <NavLink to="/admin/dashboard" end className={navLinkClass}>
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink to="/admin/dashboard/products" className={navLinkClass}>
                <Package className="h-4 w-4" />
                Gerenciar Produtos
              </NavLink>
              <NavLink to="/admin/dashboard/delivered-works" className={navLinkClass}>
                <ShoppingBag className="h-4 w-4" />
                Gerenciar Trabalhos
              </NavLink>
            </nav>
          </div>
          <div className="mt-auto p-4">
             <button onClick={handleLogout} className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 w-full">
                <LogOut className="h-4 w-4" />
                Sair
              </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6">
           {/* Mobile Nav could be added here */}
           <div className="w-full flex-1">
            <h1 className="font-semibold text-lg">Painel do Administrador</h1>
           </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
