import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './utils/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LanguageToggle from './components/LanguageToggle';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-dark-gradient pt-20">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/drinks" element={<ProductsPage type="drinks" />} />
            <Route path="/food" element={<ProductsPage type="food" />} />
            <Route path="/hookahs" element={<ProductsPage type="hookahs" />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
