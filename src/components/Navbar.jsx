import { useState, useContext } from 'react'; // 1. Añadimos useContext
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import logoRallyhub from '../assets/rallyhublogo.png';
import logoRallyhubBlanco from '../assets/rallyhublogoblanco.png';
import { CartContext } from '../context/CartContext'; // 2. Importamos tu Carrito

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useContext(CartContext); // 3. Leemos cuántos items hay

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 font-bold text-2xl tracking-wider text-red-600">
            <img src={logoRallyhubBlanco} alt="Logo de RallyHub" className="h-30 " />
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

          {/* Menú */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/catalog" className="hover:text-red-500 transition">Catálogo</Link>
            <Link to="/cart" className="relative hover:text-red-500 transition">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            </Link>
            <Link to="/login" className="flex items-center space-x-1 hover:text-red-500 transition">
              <User className="h-6 w-6" />
              <span>Login</span>
            </Link>
          </div>

          {/* Botón Menú Móvil */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-red-500 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 pb-4 px-4">
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
            <Link to="/login" className="block py-2 hover:text-red-500">Iniciar Sesión</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;