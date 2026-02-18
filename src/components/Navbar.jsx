import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, LogOut } from 'lucide-react';
import logoRallyhub from '../assets/rallyhublogo.png';
import logoRallyhubBlanco from '../assets/rallyhublogoblanco.png';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useContext(CartContext);
  
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); 
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 font-bold text-2xl tracking-wider text-red-600">
             <img src={logoRallyhubBlanco} alt="Logo de RallyHub" className="h-10" /> 
          </Link>

          {/* Buscador */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar piezas, cascos..."
                className="w-full bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Menu PC */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/catalog" className="hover:text-red-500 transition">Catálogo</Link>
            
            <Link to="/cart" className="relative hover:text-red-500 transition">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            </Link>


            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300 hidden lg:block">Hola, {user.email.split('@')[0]}</span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-red-500 transition cursor-pointer"
                  title="Cerrar Sesión"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 hover:text-red-500 transition">
                <User className="h-6 w-6" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Botón Menu Móvil */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-red-500 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 pb-4 px-4 border-t border-gray-800">
          <div className="pt-4 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full bg-gray-800 text-white rounded-lg py-2 px-4 pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="space-y-2 mt-2">
            <Link to="/catalog" className="block py-2 hover:text-red-500">Catálogo</Link>
            <Link to="/cart" className="block py-2 hover:text-red-500">Carrito ({totalItems})</Link>
            

            {user ? (
              <>
                <div className="block py-2 text-gray-400 text-sm border-t border-gray-700 mt-2 pt-2">
                  Sesión de: {user.email}
                </div>
                <button onClick={handleLogout} className="block w-full text-left py-2 text-red-500 font-bold">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link to="/login" className="block py-2 hover:text-red-500">Iniciar Sesión</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;