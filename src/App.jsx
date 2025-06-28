import { useState } from 'react'
import './App.css'
import './cropper-style.css';

import ImageToText from './Pages/ImageToText'
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <ImageToText/>
    <Footer/>
    </>
  )
}

export default App
