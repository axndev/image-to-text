import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './cropper-style.css';

import ImageToText from './Pages/ImageToText';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import About from './Pages/About';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfService from './Pages/TermsOfService';
import Contact from './Pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ImageToText />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
