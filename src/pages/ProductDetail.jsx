import { useState, useEffect, useContext } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext'; 

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No se encontró el producto");
        }
      } catch (error) {
        console.error("Error al buscar el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  const handleAddToCart = () => {
    addToCart(product);

    alert(`¡${product.nombre} añadido al carrito! `); 
  };

  if (loading) return <div className="text-center py-20 text-2xl font-bold animate-pulse text-gray-700">Cargando...</div>;
  if (!product) return <div className="text-center py-20 text-2xl font-bold text-red-600">Error 404: Producto no encontrado</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Link to="/catalog" className="inline-flex items-center text-red-600 hover:text-gray-900 mb-6 font-bold transition-colors">
        <ArrowLeft className="h-5 w-5 mr-2" /> Volver al Catálogo
      </Link>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        <div className="md:w-1/2 h-96 md:h-auto bg-gray-50 p-8 flex items-center justify-center">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="max-w-full max-h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <div className="text-sm font-black text-red-600 uppercase tracking-widest mb-2">
            {product.categoria}
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.nombre}</h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {product.descripcion}
          </p>

          <div className="mt-auto">
            <span className="text-5xl font-black text-gray-900 block mb-6">{product.precio}€</span>
            

            <button 
              onClick={handleAddToCart}
              className="w-full bg-gray-900 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-all duration-300 text-lg shadow-lg hover:shadow-red-600/50 cursor-pointer"
            >
              <ShoppingCart className="h-6 w-6" />
              Añadir al baquet
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;