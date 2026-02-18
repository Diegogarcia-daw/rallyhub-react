import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle, Loader } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Usamos la función login del contexto
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Intentamos entrar
      await login(email, password);
      // Si funciona, nos vamos al catálogo
      navigate('/catalog');
    } catch (err) {
      console.error("Error de login:", err);
      // Traducimos los errores de Firebase
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === "auth/invalid-credential") {
        setError('Correo o contraseña incorrectos.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Has fallado demasiadas veces. Espera unos minutos.');
      } else {
        setError('Error al iniciar sesión. Inténtalo de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-10">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-900 mb-4">
            <LogIn className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-black text-gray-900">Bienvenido</h2>
          <p className="text-gray-500 mt-2">Introduce tus credenciales para iniciar sesión</p>
        </div>

        {/* Caja de Errores */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-3 text-sm font-medium">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
            <div className="relative">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 pl-11 focus:outline-none focus:ring-2 focus:ring-red-600" 
                placeholder="piloto@rallyhub.com" 
              />
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña</label>
            <div className="relative">
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 pl-11 focus:outline-none focus:ring-2 focus:ring-red-600" 
                placeholder="••••••••" 
              />
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2 text-lg shadow-lg ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-gray-900 text-white hover:shadow-red-600/50'}`}
          >
            {isSubmitting ? <Loader className="h-6 w-6 animate-spin" /> : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8">
          ¿Aún no tienes cuenta?{' '}
          <Link to="/register" className="text-red-600 font-bold hover:underline">
            Regístrate gratis
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;