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
import Blog from './Pages/Blog';
import Article from './Pages/Article';
import ReactGA from "react-ga4";
ReactGA.initialize("G-T4N8B78V44"); // paste YOUR Measurement ID here
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
}
function App() {
  usePageTracking();
  return (
    <Router>
      <div className="flex flex-col md:min-h-screen">
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
  );
}


export default App;
