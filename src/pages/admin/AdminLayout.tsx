import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// ADICIONE Menu, X e useState:
import { LayoutDashboard, Package, ShoppingBag, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react'; //

const AdminLayout = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  // NOVO: Estado para controlar a visibilidade do menu lateral
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); //

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
      
      {/* NOVO: Overlay de fundo para o mobile, visível quando o menu está aberto */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* BARRA LATERAL */}
      <div 
        // Lógica de classes para esconder/mostrar no mobile:
        // fixo no mobile, transiciona na abertura/fechamento
        // lg:static e lg:translate-x-0 para manter no desktop
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r bg-gray-100/40 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:block`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <NavLink to="/" className="flex items-center gap-2 font-semibold font-serif">
              <ShoppingBag className="h-6 w-6 text-brand-green" />
              <span>Zia Crochet</span>
            </NavLink>
            {/* NOVO: Botão de fechar menu no mobile */}
            <button className="ml-auto lg:hidden p-2" onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <NavLink to="/admin/dashboard" end className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink to="/admin/dashboard/products" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
                <Package className="h-4 w-4" />
                Gerenciar Produtos
              </NavLink>
              <NavLink to="/admin/dashboard/delivered-works" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
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
      
      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6">
           {/* NOVO: Botão de abrir menu no mobile */}
           <button className="lg:hidden p-2" onClick={() => setIsSidebarOpen(true)}>
             <Menu size={24} />
           </button>
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