import { Link } from 'react-router-dom';
import imagenPrincipal from '../assets/compraya.png';
import { ArrowRight, Star } from 'lucide-react'; // Importamos los iconos nuevos

const Home = () => {
  
    // Datos de mentira para productos destacados para no esperar por firebase y que cargue mas rapido 
  const destacados = [
    {
      id: 1,
      nombre: "Casco Bell Mag-10",
      precio: "900€",
      img: "data:image/jpeg;base64,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",
      categoria: "Equipamiento"
    },
    {
      id: 2,
      nombre: "Mono OMP Fist-S",
      precio: "500€",
      img: "https://ompracing.es/44180-large_default/mono-omp-firsts.jpg",
      categoria: "Equipamiento"
    },
    {
      id: 3,
      nombre: "BOTAS OMP ONE EVO FX",
      precio: "250€",
      img: "https://ompracing.es/51962-large_default/botas-omp-one-evo-fx-obs.jpg",
      categoria: "Equipamiento"
    }
  ];

  return (
    <div className="space-y-12 pb-10">    
      
      <div className="p-4">
        <div className="w-full h-96 overflow-hidden rounded-2xl shadow-xl relative group">
          <img 
            src={imagenPrincipal} 
            alt="Coche de Rally en acción" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
          
          <div className="absolute bottom-8 left-8 text-white">
             <h1 className="text-4xl font-black mb-2 italic">RALLYHUB</h1>
             <p className="font-medium text-lg text-gray-200">Equipamiento profesional para pilotos exigentes</p>
          </div>
        </div>
      </div>

      <section className="px-4 md:px-0 max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-gray-900 flex items-center gap-2 italic">
            🏁 Productos Destacados
          </h2>
          <Link to="/catalog" className="text-red-600 font-bold hover:underline flex items-center gap-1">
            Ver catálogo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destacados.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
              
              <div className="h-64 overflow-hidden bg-gray-50 flex items-center justify-center p-6 relative">
                <img 
                  src={item.img} 
                  alt={item.nombre} 
                  className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                  Top Ventas
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-bold text-red-600 uppercase mb-2 tracking-widest">{item.categoria}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{item.nombre}</h3>
                
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-400 text-xs ml-2 font-medium">(24 reviews)</span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-2xl font-black text-gray-900">{item.precio}</span>
                  <Link 
                    to="/catalog" 
                    className="bg-gray-900 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-md group-hover:shadow-lg"
                    title="Ver en catálogo"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;