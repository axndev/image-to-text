import { useState } from 'react'
import './App.css'
import './cropper-style.css';

import ImageToText from './Pages/ImageToText'
import Navbar from './Components/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <ImageToText/>
    </>
  )
}

export default App
