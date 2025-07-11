import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './cropper-style.css';

import ImageToText from './Pages/ImageToText';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import About from './Pages/About';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfService from './Pages/TermsOfService';
import Contact from './Pages/Contact';
import Blog from './Pages/Blog';
import Article from './Pages/Article';

import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import 'primeicons/primeicons.css';

// ✅ Import Helmet and HelmetProvider
import { Helmet, HelmetProvider } from 'react-helmet-async';

// ✅ Initialize Google Analytics
ReactGA.initialize('G-T4N8B78V44');

// ✅ Hook for page tracking
function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
    });
  }, [location]);
}

// ✅ Listener for page tracking
function GAListener() {
  usePageTracking();
  return null;
}

function App() {
  return (
    <HelmetProvider>
      {/* ✅ Fallback Helmet for initial page load */}
      <Helmet>
        <title>Pro Image to Text Converter</title>
        <meta
          name="description"
          content="Convert images to text for free with our fast & secure online OCR tool."
        />
      </Helmet>

      <Router>
        <GAListener />

        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<ImageToText />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<Article />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
