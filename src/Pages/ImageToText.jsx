import Tesseract from 'tesseract.js';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../Components/ui/button';
import { Card, CardContent } from '../Components/ui/card';
import { Loader2, Copy, UploadCloud, Moon, Sun, Download } from 'lucide-react';
import { cn } from '../lib/utils';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../lib/cropImage';

export default function ImageToText() {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('eng');
  const dropRef = useRef(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };


  const handleImageChange = (e) => {
    setText('');
    setError('');
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    }
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          setImage(file);
        }
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleExtractText = async () => {
    if (!image) return alert('Please upload an image.');

    setLoading(true);
    setText('');
    setError('');

    try {
      const {
        data: { text: extractedText }
      } = await Tesseract.recognize(
        image,
        language,
        {
          logger: m => console.log(m) // Optional: shows OCR progress in console
        }
      );

      if (extractedText.trim()) {
        setText(extractedText);
      } else {
        setError('No text found.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to extract text.');
    } finally {
      setLoading(false);
    }
  };


  const handleCopyText = () => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Text copied to clipboard!');
    });
  };

  const handleDownloadText = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'extracted-text.txt';
    link.click();
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  return (
    <>
      <div className={cn("min-h-auto", darkMode ? "bg-gray-900 mb-10 text-white" : "bg-white text-black") + " max-w-3xl mx-auto p-6 transition-colors duration-300 mt-5 md:mt-20"}>
        <div className="flex justify-between items-center mb-6 ">
          
          <div className="flex-shrink-0 flex items-center gap-3">
          <img src="/logo.png" className='max-w-10' alt="" />
          <h1 className="text-3xl font-bold">Pro Image to Text</h1>
          </div>
          <div className="hidden">
            <Button onClick={toggleTheme} variant="ghost">
              {darkMode ? <Sun /> : <Moon />}
            </Button>
          </div>

        </div>

        <div className="mb-4 hidden">
          <label className="block mb-1 font-semibold">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded px-2 py-1 w-full text-black"
          >
            <option value="eng">English</option>
            <option value="ara">Arabic</option>
            <option value="spa">Spanish</option>
            <option value="fra">French</option>
            <option value="deu">German</option>
          </select>
        </div>

        <Card
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-dashed border-2 border-gray-300 p-8 text-center mb-6 cursor-pointer hover:border-blue-500 transition"
        >
          <label className="cursor-pointer block">
            <UploadCloud className="mx-auto mb-2 text-blue-500" size={48} />
            <span className="block mb-2">Drag & drop, paste with Ctrl+V or click to upload an image</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </Card>

        {image && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <img src={URL.createObjectURL(image)} alt="Preview" className="max-w-full h-auto rounded shadow" />
            </CardContent>
          </Card>
        )}

        <div className="flex flex-wrap gap-4 mb-4">
          <Button onClick={handleExtractText} disabled={loading}>
            {loading ? <><Loader2 className="animate-spin mr-2" /> Extracting...</> : 'Extract Text'}
          </Button>
          {text && (
            <>
              <Button variant="secondary" onClick={handleCopyText}>
                <Copy className="mr-2" /> Copy Text
              </Button>
              <Button variant="secondary" onClick={handleDownloadText}>
                <Download className="mr-2" /> Download Text
              </Button>
            </>
          )}
        </div>

        {text && (
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2">Extracted Text:</h2>
              <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-sm text-black dark:text-white">{text}</pre>
            </CardContent>
          </Card>
        )}

        {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
      </div>
      <section className="max-w-3xl mx-auto md:mt-2 p-6 bg-white dark:bg-gray-900 ">
        <h2 className="text-2xl font-bold mb-4 md:text-3xl">About Pro Image to Text</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Pro Image to Text is a free, fast, and accurate online tool that extracts text from images in seconds.
          Whether it’s a scanned document, handwritten note, or a photo with text, our advanced OCR (Optical Character Recognition)
          converts it into editable text instantly — no manual typing needed.
        </p>

        <h3 className="text-xl font-semibold mb-2">How It Works — See a Demo</h3>

        <div className="flex flex-col md:flex-row md:space-x-6 items-center mb-6">
          <img
            src="/demo-image.png"
            alt="Demo OCR Example"
            className="w-full md:w-1/2 rounded border"
          />

          <div className="mt-4 md:mt-0 md:w-1/2 bg-gray-100 dark:bg-gray-800 p-4 rounded">
            <h4 className="font-semibold mb-2">Extracted Text:</h4>
            <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
              This is an example text
              extracted from the uploaded
              image using Pro Image to Text.
            </pre>
            <div className="flex gap-3 mt-3">
              <Button variant="secondary">
                <Copy className="mr-2" size={16} /> Copy Text
              </Button>
              <Button variant="secondary">
                <Download className="mr-2" size={16} /> Download Text
              </Button>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Why Use Pro Image to Text?</h3>
        <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300">
          <li><strong>Fast & Accurate:</strong> Get clean, editable text instantly.</li>
          <li><strong>Supports Multiple Languages:</strong> English, Arabic, Spanish, French, German, and more.</li>
          <li><strong>Free & Secure:</strong> Your images are never stored or shared.</li>
          <li><strong>Easy to Use:</strong> Drag & drop, paste, or upload — it just works!</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300">
          No sign-up required. Use Pro Image to Text anywhere, anytime — and boost your productivity now!
        </p>
      </section>

    </>
  );
}