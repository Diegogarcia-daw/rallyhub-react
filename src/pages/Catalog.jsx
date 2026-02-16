import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Link } from 'react-router-dom';

const Catalog = () => {
  // 1. Estados para guardar los productos y saber si está cargando
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setProducts(productsList); 
      } catch (error) {
        console.error("Error al traer los productos: ", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-2xl font-bold text-gray-600 animate-pulse">Cargando catálogo... </p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <h2 className="text-4xl font-bold mb-8 text-gray-900 border-b-4 border-red-600 inline-block pb-2">
        Catálogo de Competición
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col">
            
            <div className="h-64 bg-gray-100 overflow-hidden">
              <img 
                src={product.imagen} 
                alt={product.nombre} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
                {product.categoria}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.nombre}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{product.descripcion}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-2xl font-black text-gray-900">{product.precio}€</span>
                <Link 
                  to={`/product/${product.id}`}
                  className="bg-gray-900 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 text-sm"
                >
                  Ver Detalle
                </Link>
              </div>
            </div>
            
          </div>
        ))}

      </div>
    </div>
  );
};

export default Catalog;