import Tesseract from 'tesseract.js';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { UploadCloud, Copy, Download, X } from 'lucide-react';
import { Button } from '../Components/ui/button';
import { Card } from '../Components/ui/card';

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

        ctx.filter = 'contrast(150%) brightness(120%)';
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
          const avg = (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3;
          imgData.data[i] = avg;
          imgData.data[i + 1] = avg;
          imgData.data[i + 2] = avg;
        }

        ctx.putImageData(imgData, 0, 0);
        canvas.toBlob(resolve);
      };
    });
  };

  const cleanText = (raw) => {
    return raw
      .split('\n')
      .filter((line) => line.trim() !== '')
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const handleExtractAll = async () => {
    setExtracting(true);

    for (const img of images) {
      setImages((prev) =>
        prev.map((i) =>
          i.id === img.id ? { ...i, loading: true, text: '', error: '' } : i
        )
      );

      try {
        const preprocessed = await processImage(img.file);

        const {
          data: { text: rawText },
        } = await Tesseract.recognize(URL.createObjectURL(preprocessed), 'eng', {
          logger: (m) => console.log(m),
        });

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
      </Helmet>
      <main class="max-w-6xl mx-auto px-4 py-12 space-y-8">
        <div className=" mx-auto">
          <h1 className="text-3xl font-bold mb-6">Pro Image to Text</h1>

          <Card
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-dashed border-2 !border-[#A8DFE9] p-22 text-center mb-6 cursor-pointer transition"
          >
            <label className="cursor-pointer block">
              <UploadCloud className="mx-auto mb-2 text-[#A8DFE9]" size={48} />
              <span className="block mb-2">
                Drag & drop, paste with Ctrl+V or click to <span className='text-[#74b2bd]'>Upload images</span>
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </Card>

          {images.length > 0 && (
            <div className='my-10'>
              <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-normal">
                <Button
                  onClick={() => setImages([])}
                  className="bg-red-500 text-white"
                >
                  Start Over
                </Button>
                <Button
                  onClick={handleDownloadAll}
                  className="bg-green-500 text-white"
                >
                  Download All
                </Button>
              </div>

              <div className="flex flex-col gap-4 mb-4 bg-white p-6 rounded">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="flex items-center gap-4 border border-gray-300 p-5 rounded shadow relative flex-col md:flex-row"
                  >
                    <div className="">
                      <img
                        src={URL.createObjectURL(img.file)}
                        className="w-40 md:w-30 h-auto rounded shadow border border-gray-300"
                        alt=""
                      />
                      {/* Hide first X when text exists */}
                      {!img.text && (
                        <Button
                          onClick={() => handleRemove(img.id)}
                          variant="secondary"
                          className="absolute top-1/2 right-5 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
                        >
                          <X size={20} />
                        </Button>
                      )}
                    </div>

                    <div className="flex-1 ">
                      <h4 className="font-semibold mb-2">{img.name}</h4>

                      {img.loading && (
                        <div className="text-blue-600 font-medium mb-2">
                          Extracting...
                        </div>
                      )}

                      {img.text && (
                        <pre className="bg-gray-100 p-4 font-sans text-sm rounded mb-2 whitespace-pre-wrap">
                          {img.text}
                        </pre>
                      )}

                      {img.error && (
                        <div className="text-red-600 font-medium">{img.error}</div>
                      )}

                      {img.text && (
                        <div className="flex gap-2 mt-2 items-center">
                          <Button
                            variant="secondary"
                            onClick={() => handleCopyText(img.text)}
                          >
                            <Copy className="mr-1" size={16} />
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => handleDownloadText(img.text, img.name)}
                          >
                            <Download className="mr-1" size={16} />
                          </Button>
                          {/* ✅ New remove button after result */}
                          <Button
                            variant="secondary"
                            onClick={() => handleRemove(img.id)}
                            className="w-8 h-8 flex items-center justify-center"
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleExtractAll}
                disabled={extracting}
                className="!bg-[#A8DFE9] mt-2 m-auto "
              >
                {extracting ? 'Extracting...' : 'Extract Text'}
              </Button>
            </div>
          )}

        </div>
        <section class="mt-12">
          <h2 class="text-2xl  font-bold mb-4">Was this tool helpful?</h2>
          <form action="https://formspree.io/f/xqabnwkr" method="POST" class="space-y-4">
            <div class="flex items-center space-x-4">
              <label class="flex items-center space-x-2">
                <input type="radio" name="helpful" value="Yes" required class="accent-[#A8DFE9]" />
                <span>Yes</span>
              </label>
              <label class="flex items-center space-x-2">
                <input type="radio" name="helpful" value="No" required class="accent-[#A8DFE9]" />
                <span>No</span>
              </label>
            </div>

            <div>
              <label for="feedback" class="block mb-1 font-medium">How can we improve it?</label>
              <textarea id="feedback" name="feedback" rows="4" placeholder="Your feedback..." class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-[#A8DFE9]"></textarea>
            </div>

            <button type="submit" class="bg-[#A8DFE9] text-white cursor-pointer font-semibold px-4 py-2 rounded hover:bg-[#87cad6] transition">
              Submit Feedback
            </button>
          </form>
        </section>
        <div className='bg-white py-8  px-6 rounded'>
          <header class="">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900">Pro Image to Text Converter</h1>
            <p class="mt-2 text-lg text-gray-700">Copy text from images online for free — fast, secure, and accurate.</p>
          </header>
          <section>
            <h2 class="text-2xl font-bold mb-4">What is Image to Text Conversion?</h2>
            <p class="text-gray-700 leading-relaxed">
              Image to Text conversion uses OCR (Optical Character Recognition) technology to transform photos, scanned documents, or screenshots into editable text.
              Our free tool works with popular formats like JPG, PNG, JPEG, GIF, BMP, TIFF, and WebP.
            </p>
          </section>

          <section>
            <h2 class="text-2xl  font-bold mb-4">How to Copy Text from an Image?</h2>
            <ol class="list-decimal list-inside text-gray-700 leading-relaxed space-y-2">
              <li>Upload your image using the upload button or drag & drop it into the input area.</li>
              <li>Click the <strong>Extract Text</strong> button to process your image.</li>
              <li>Copy the extracted text to your clipboard or download it as a <code>.txt</code> file.</li>
            </ol>
          </section>

          <section>
            <h2 class="text-2xl  font-bold mb-4">Key Features</h2>
            <ul class="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
              <li><strong>Extract Text from Blurry Images:</strong> Get text even from low-resolution or slightly blurred photos.</li>
              <li><strong>Free and Unlimited:</strong> No sign-up, no hidden costs — convert as many images as you want.</li>
              <li><strong>Multi-Language Support:</strong> Recognizes text in English, Spanish, Arabic, French, and more.</li>
              <li><strong>Secure & Private:</strong> We never store your images or extracted text.</li>
              <li><strong>Copy or Download:</strong> Easily copy your text or save it for later.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl  font-bold mb-4">Why Use an Image to Text Tool?</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              A good Image to Text Converter saves you time and effort by turning scanned notes, printed documents, or screenshots into editable text instantly.
              Here’s why people love it:
            </p>
            <ul class="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
              <li><strong>Students:</strong> Digitize handwritten notes and study materials easily.</li>
              <li><strong>Professionals:</strong> Extract text from official documents and reports.</li>
              <li><strong>Content Creators:</strong> Copy quotes or captions from images for reuse.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl  font-bold mb-4">Safe & Secure</h2>
            <p class="text-gray-700 leading-relaxed">
              We care about your privacy. Your uploaded files are never saved or shared — all text extraction happens instantly and securely in your browser.
            </p>
          </section>

          <section>
            <h2 class="text-2xl  font-bold mb-4">Get Started Now</h2>
            <p class="text-gray-700 leading-relaxed">
              Skip the hassle of manual typing. Try our free Image to Text tool today and extract text from images in seconds.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
