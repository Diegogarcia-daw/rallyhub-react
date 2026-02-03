import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-rallyDark">
        <Routes>
          <Route path="/" element={<div>Página de Inicio</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;