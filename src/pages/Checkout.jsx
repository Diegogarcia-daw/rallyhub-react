import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Checkout = () => {
  const { cart, totalCart, clearCart } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);

  const guardarPedidoEnFirebase = async (detallesPago) => {
    try {
      const nuevoPedido = {
        comprador: {
          nombre: detallesPago.payer.name.given_name,
          email: detallesPago.payer.email_address,
        },
        items: cart.map(item => ({ id: item.id, nombre: item.nombre, precio: item.precio, cantidad: item.cantidad })),
        total: totalCart,
        fecha: serverTimestamp(),
        estado: 'Pagado con PayPal',
        paypal_id: detallesPago.id 
      };

      const docRef = await addDoc(collection(db, "pedidos"), nuevoPedido);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error("Error al guardar en Firebase: ", error);
    }
  };

  if (orderId) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
        <h2 className="text-4xl font-black text-gray-900 mb-4">¡Pago Completado! 🏁</h2>
        <p className="text-xl text-gray-600 mb-8">Tu equipamiento está listo. Pago verificado por PayPal.</p>
        <div className="bg-gray-100 p-6 rounded-2xl mb-8">
          <p className="text-sm font-bold text-gray-500 uppercase">ID de tu Pedido (RallyHub)</p>
          <p className="text-2xl font-mono font-bold text-gray-900">{orderId}</p>
        </div>
        <Link to="/catalog" className="bg-red-600 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full transition-colors">
          Volver a la Pista
        </Link>
      </div>
    );
  }

  if (cart.length === 0) return <div className="text-center py-20 text-2xl font-bold">No hay nada que pagar.</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Link to="/cart" className="inline-flex items-center text-red-600 hover:text-gray-900 mb-6 font-bold">
        <ArrowLeft className="h-5 w-5 mr-2" /> Volver al Carrito
      </Link>
      
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        <div className="md:w-1/2 bg-gray-900 p-8 text-white">
          <h3 className="text-2xl font-bold mb-6">Resumen del Pedido</h3>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm text-gray-300">
                <span>{item.cantidad}x {item.nombre}</span>
                <span>{item.precio * item.cantidad}€</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-4 flex justify-between items-end">
            <span className="text-gray-400">Total a pagar</span>
            <span className="text-4xl font-black text-white">{totalCart}€</span>
          </div>
        </div>

        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Paga de forma segura</h2>
          <PayPalScriptProvider options={{ "client-id": "test", currency: "EUR" }}>
            <PayPalButtons 
              style={{ layout: "vertical", color: "gold", shape: "pill" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{ amount: { value: totalCart.toString() } }],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  guardarPedidoEnFirebase(details);
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default Checkout;