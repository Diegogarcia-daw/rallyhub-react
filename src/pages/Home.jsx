import { Link } from 'react-router-dom';
import imagenPrincipal from '../assets/compraya.png';

const Home = () => {
  return (
    <div className="space-y-12">    
      {/* Sección del hero */}
      <div className="p-4">
      
      {/* Conntenedor de la imagen */}
      <div className="w-full h-96 overflow-hidden rounded-2xl shadow-xl relative">
        
        <img 
          src={imagenPrincipal} 
          alt="Coche de Rally en acción" 
          className="w-full h-full object-cover" 
        />
        
      </div>

    </div>

      {/* Parte de productos destacados */}
      <section className="px-4 md:px-0">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          🏁 Productos Destacados
        </h2>   
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Equipamiento piloto */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-64 flex flex-col items-center justify-center hover:shadow-xl transition text-center group cursor-pointer">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-50 transition">
               🏎️
            </div>
            <h3 className="font-bold text-lg text-gray-800">Equipamiento piloto</h3>
            <span className="text-sm text-gray-500">Próximamente</span>
          </div>
          {/* Coche */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-64 flex flex-col items-center justify-center hover:shadow-xl transition text-center group cursor-pointer">
             <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-50 transition">
               🔧
            </div>
            <h3 className="font-bold text-lg text-gray-800">Equipamiento/Recambios coche</h3>
            <span className="text-sm text-gray-500">Próximamente</span>
          </div>
          {/* Simracing */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-64 flex flex-col items-center justify-center hover:shadow-xl transition text-center group cursor-pointer">
             <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-50 transition">
               🎮
            </div>
            <h3 className="font-bold text-lg text-gray-800">Sim Racing</h3>
            <span className="text-sm text-gray-500">Próximamente</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;