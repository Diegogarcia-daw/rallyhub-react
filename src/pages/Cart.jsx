import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { CartContext } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, totalCart } = useContext(CartContext);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="bg-gray-100 p-8 rounded-full mb-6">
          <ShoppingBag className="h-20 w-20 text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-8 text-lg">Parece que aún no has seleccionado tu equipamiento para la carrera.</p>
        <Link 
          to="/catalog" 
          className="bg-red-600 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 text-lg flex items-center gap-2"
        >
          Ir al Catálogo <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-black mb-10 text-gray-900 border-b-4 border-red-600 inline-block pb-2">
        Tu Carrito de Competición
      </h2>

      <div className="flex flex-col lg:flex-row gap-10">
        
        <div className="lg:w-2/3 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow">
              
              <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.imagen} alt={item.nombre} className="w-full h-full object-contain p-2" />
              </div>

              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{item.nombre}</h3>
                <p className="text-sm font-bold text-red-600 uppercase mb-2">{item.categoria}</p>
                <div className="flex items-center justify-center sm:justify-start gap-4 text-gray-600 font-medium">
                  <span>Cantidad: {item.cantidad}</span>
                  <span>|</span>
                  <span>{item.precio}€ / ud</span>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-4 w-full sm:w-auto mt-4 sm:mt-0 px-4 sm:px-0 border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0">
                <span className="text-2xl font-black text-gray-900">{item.precio * item.cantidad}€</span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                  title="Eliminar del carrito"
                >
                  <Trash2 className="h-6 w-6" />
                </button>
              </div>

            </div>
          ))}
        </div>

        <div className="lg:w-1/3">
          <div className="bg-gray-900 rounded-3xl p-8 text-white sticky top-24 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">Resumen del pedido</h3>
            
            <div className="space-y-4 mb-8 text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-white">{totalCart}€</span>
              </div>
              <div className="flex justify-between">
                <span>Envío (Express VIP)</span>
                <span className="text-green-400 font-bold">Gratis</span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6 mb-8 flex justify-between items-end">
              <span className="text-lg">Total a pagar:</span>
              <span className="text-4xl font-black text-red-500">{totalCart}€</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors duration-300 text-lg shadow-lg hover:shadow-red-600/50 mb-4 cursor-pointer"
            >
              Finalizar Compra
            </button>
            
            <button 
              onClick={clearCart}
              className="w-full bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white font-medium py-3 rounded-xl transition-colors text-sm cursor-pointer"
            >
              Vaciar carrito completo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;