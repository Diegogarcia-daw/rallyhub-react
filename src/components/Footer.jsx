import { Instagram, Twitter, Facebook, Flag } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo y Copyright */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Flag className="h-6 w-6 text-red-600" />
              <h3 className="text-xl font-bold text-white italic tracking-wider">RALLYHUB</h3>
            </div>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} RallyHub. Todos los derechos reservados.
            </p>
          </div>

          {/* Enlaces Sociales */}
          <div className="flex space-x-8">
            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110">
              <Twitter className="h-6 w-6" />
            </a>
            <a a="https://www.instagram.com" className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110">
              <Facebook className="h-6 w-6" />
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;