import { useState } from 'react'
import './App.css'
import './cropper-style.css';

import ImageToText from './Pages/ImageToText'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ImageToText/>
    </>
  )
}

export default App
