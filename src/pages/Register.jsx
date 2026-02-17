import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserPlus, Mail, Lock, AlertCircle, Loader } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Nos traemos la función register de tu contexto
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Intentamos crear la cuenta en Firebase
      await register(email, password);
      // Si funciona, lo mandamos directamente al catálogo para que compre
      navigate('/catalog'); 
    } catch (err) {
      console.error("Error de registro:", err);
      // Firebase nos devuelve códigos de error en inglés, los traducimos:
      if (err.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado. Por favor, inicia sesión.');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña es muy débil. Debe tener al menos 6 caracteres.');
      } else {
        setError('Hubo un problema al crear tu cuenta. Inténtalo de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-10">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
            <UserPlus className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-black text-gray-900">Crear Licencia</h2>
          <p className="text-gray-500 mt-2">Únete al parque cerrado de RallyHub</p>
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
                placeholder="Mínimo 6 caracteres" 
              />
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2 text-lg shadow-lg ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-red-600 text-white hover:shadow-red-600/50'}`}
          >
            {isSubmitting ? <Loader className="h-6 w-6 animate-spin" /> : 'Registrarse'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8">
          ¿Ya tienes tu licencia de piloto?{' '}
          <Link to="/login" className="text-red-600 font-bold hover:underline">
            Inicia Sesión aquí
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;