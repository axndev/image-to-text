import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Tesseract from 'tesseract.js';
import { Button } from '../Components/ui/button';
import { X, Copy, Download } from 'lucide-react';

export default function ImageToText() {
  const [images, setImages] = useState([]);
  const [extracting, setExtracting] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files
      .filter((file) => file.type.startsWith('image/'))
      .map((file) => ({
        id: crypto.randomUUID(),
        file,
        name: file.name,
        text: '',
        loading: false,
        error: '',
      }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    const pastedImages = [];
    for (let item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          pastedImages.push({
            id: crypto.randomUUID(),
            file,
            name: file.name || 'pasted-image.png',
            text: '',
            loading: false,
            error: '',
          });
        }
      }
    }
    if (pastedImages.length) {
      setImages((prev) => [...prev, ...pastedImages]);
    }
  };

  const handleRemove = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newImages = files
      .filter((file) => file.type.startsWith('image/'))
      .map((file) => ({
        id: crypto.randomUUID(),
        file,
        name: file.name,
        text: '',
        loading: false,
        error: '',
      }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const processImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        // Improve contrast & brightness for OCR
        ctx.filter = 'contrast(150%) brightness(120%)';
        ctx.drawImage(img, 0, 0);

        // Convert to grayscale
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
          const avg = (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3;
          imgData.data[i] = avg;
          imgData.data[i + 1] = avg;
          imgData.data[i + 2] = avg;
        }
        ctx.putImageData(imgData, 0, 0);

        canvas.toBlob((blob) => {
          resolve(blob);
          URL.revokeObjectURL(img.src); // Clean up URL
        });
      };
    });
  };

  const cleanText = (raw) =>
    raw
      .split('\n')
      .filter((line) => line.trim() !== '')
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

  const handleExtractAll = async () => {
    setExtracting(true);

    for (const img of images) {
      setImages((prev) =>
        prev.map((i) =>
          i.id === img.id ? { ...i, loading: true, text: '', error: '' } : i
        )
      );

      try {
        const preprocessedBlob = await processImage(img.file);
        const preprocessedURL = URL.createObjectURL(preprocessedBlob);

        const { data: { text: rawText } } = await Tesseract.recognize(preprocessedURL, 'eng', {
          logger: (m) => console.log(m),
        });

        URL.revokeObjectURL(preprocessedURL);

        const cleaned = cleanText(rawText);

        setImages((prev) =>
          prev.map((i) =>
            i.id === img.id
              ? {
                  ...i,
                  text: cleaned || '',
                  error: cleaned ? '' : 'No text found.',
                  loading: false,
                }
              : i
          )
        );
      } catch (err) {
        console.error(err);
        setImages((prev) =>
          prev.map((i) =>
            i.id === img.id ? { ...i, error: 'Failed to extract text.', loading: false } : i
          )
        );
      }
    }

    setExtracting(false);
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text).then(() => alert('Copied!'));
  };

  const handleDownloadText = (text, name) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = name ? `${name}-text.txt` : 'extracted-text.txt';
    link.click();
  };

  const handleDownloadAll = () => {
    images.forEach((img) => {
      if (img.text) {
        handleDownloadText(img.text, img.name);
      }
    });
  };

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  return (
    <>
      <Helmet>
        <title>Pro Image to Text - Multi OCR</title>
        <meta
          name="description"
          content="Copy text from images for free, fast & secure OCR tool."
        />
      </Helmet>

      <main className="max-w-6xl md:mx-auto space-y-10 md:p-10 px-5 py-10 md:mt-15 mt-5 mx-2 bg-white rounded shadow">
        {/* Hero */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pro Image to Text Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Copy text from images online for free — fast, secure, and accurate.
          </p>
        </header>

        {/* Upload */}
        <section className="text-center">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-[#A8DFE9] p-12 rounded-lg hover:border-cyan-500 transition-colors cursor-pointer"
          >
            <label className="cursor-pointer block">
              <img src="/cloud.png" className="max-w-17 m-auto mb-5" alt="Upload cloud" />
              <span className="block mb-2 text-gray-700">
                Drag & drop, paste with Ctrl+V or click to{' '}
                <span className="text-[#74b2bd] font-semibold underline">
                  Upload images
                </span>
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </section>

        {/* Actions & Results */}
        {images.length > 0 && (
          <section className="space-y-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={() => setImages([])}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Start Over
              </Button>
              <Button
                onClick={handleDownloadAll}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Download All
              </Button>
              <Button
                onClick={handleExtractAll}
                disabled={extracting}
                className="bg-[#A8DFE9] text-white hover:bg-[#87cad6]"
              >
                {extracting ? 'Extracting...' : 'Extract Text'}
              </Button>
            </div>

            <div className="space-y-6">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="flex flex-col md:flex-row gap-6 border border-gray-200 rounded-lg p-6 shadow-sm"
                >
                  <img
                    src={URL.createObjectURL(img.file)}
                    alt={img.name}
                    className="w-full md:w-40 rounded border"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{img.name}</h4>

                    {img.loading && (
                      <p className="text-blue-600 font-medium mb-2">Extracting...</p>
                    )}

                    {img.error && (
                      <p className="text-red-600 font-medium mb-2">{img.error}</p>
                    )}

                    {img.text && (
                      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto whitespace-pre-wrap mb-2">
                        {img.text}
                      </pre>
                    )}

                    <div className="flex gap-2 flex-wrap">
                      {img.text && (
                        <>
                          <Button variant="secondary" onClick={() => handleCopyText(img.text)}>
                            <Copy className="mr-1" size={16} /> Copy
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => handleDownloadText(img.text, img.name)}
                          >
                            <Download className="mr-1" size={16} /> Download
                          </Button>
                        </>
                      )}
                      <Button variant="secondary" onClick={() => handleRemove(img.id)}>
                        <X className="mr-1" size={16} /> Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Feedback */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold">Was this tool helpful?</h2>
          <form
            action="https://formspree.io/f/xqabnwkr"
            method="POST"
            className="space-y-4"
          >
            <div className="flex justify-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="helpful"
                  value="Yes"
                  required
                  className="accent-[#A8DFE9]"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="helpful"
                  value="No"
                  required
                  className="accent-[#A8DFE9]"
                />
                No
              </label>
            </div>

            <div>
              <label htmlFor="feedback" className="block mb-1 font-medium" required>
                How can we improve it?
              </label>
              <input type="email" required name='email' id='email' placeholder='Email' className='w-full border border-gray-300 rounded p-2 my-3 focus:outline-none focus:ring focus:border-[#A8DFE9]'/>
              <textarea
                id="feedback"
                required
                name="feedback"
                rows="4"
                placeholder="Your feedback..."
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring focus:border-[#A8DFE9] "
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#A8DFE9] text-white font-semibold px-6 py-2 rounded hover:bg-[#87cad6] transition"
            >
              Submit Feedback
            </button>
          </form>
          </section>
          {/* Info Sections */}
        <section className="space-y-12 ">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">What is Image to Text Conversion?</h2>
            <p className="text-gray-700 max-w-3xl leading-relaxed">
              Image to Text conversion uses OCR (Optical Character Recognition) technology
              to transform photos, scanned documents, or screenshots into editable text.
              Our free tool works with popular formats like JPG, PNG, JPEG, GIF, BMP, TIFF, and WebP.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">How to Copy Text from an Image?</h2>
            <ol className="list-decimal list-inside text-gray-700 max-w-3xl space-y-2 leading-relaxed">
              <li>Upload your image using the upload button or drag & drop it into the input area.</li>
              <li>Click the <strong>Extract Text</strong> button to process your image.</li>
              <li>Copy the extracted text to your clipboard or download it as a <code>.txt</code> file.</li>
            </ol>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Key Features</h2>
            <ul className="list-disc list-inside text-gray-700 max-w-3xl space-y-2 leading-relaxed">
              <li><strong>Extract Text from Blurry Images:</strong> Get text even from low-resolution or slightly blurred photos.</li>
              <li><strong>Free and Unlimited:</strong> No sign-up, no hidden costs — convert as many images as you want.</li>
              <li><strong>Multi-Language Support:</strong> Recognizes text in English, Spanish, Arabic, French, and more.</li>
              <li><strong>Secure & Private:</strong> We never store your images or extracted text.</li>
              <li><strong>Copy or Download:</strong> Easily copy your text or save it for later.</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Why Use an Image to Text Tool?</h2>
            <p className="text-gray-700 max-w-3xl leading-relaxed">
              A good Image to Text Converter saves you time and effort by turning scanned notes,
              printed documents, or screenshots into editable text instantly. Here’s why people love it:
            </p>
            <ul className="list-disc list-inside text-gray-700 max-w-3xl space-y-2 leading-relaxed">
              <li><strong>Students:</strong> Digitize handwritten notes and study materials easily.</li>
              <li><strong>Professionals:</strong> Extract text from official documents and reports.</li>
              <li><strong>Content Creators:</strong> Copy quotes or captions from images for reuse.</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Safe & Secure</h2>
            <p className="text-gray-700 max-w-3xl leading-relaxed">
              We care about your privacy. Your uploaded files are never saved or shared — all text extraction
              happens instantly and securely in your browser.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Get Started Now</h2>
            <p className="text-gray-700 max-w-3xl leading-relaxed">
              Skip the hassle of manual typing. Try our free Image to Text tool today and extract text from images in seconds.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
