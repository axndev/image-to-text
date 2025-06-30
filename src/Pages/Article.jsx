import { useParams } from 'react-router-dom';

const articles = [
    {
      title: "How to Convert Images to Text Online for Free (Step-by-Step Guide)",
      slug: "convert-images-to-text-online",
      summary: "Learn how to use ProImageToText to extract text from any image or scanned document in seconds.",
      image: "/images/convert-images-to-text.png",
      content: (
        <>
          <p>
            Do you have a photo, screenshot, or scanned document that you wish you could turn into editable text? Good news — with ProImageToText, you can convert images to text online for free, in just a few seconds.
          </p>
  
          <h2>What is ProImageToText?</h2>
          <p>
            ProImageToText is a free online OCR (Optical Character Recognition) tool that extracts text from images instantly. Whether it’s a photo of a handwritten note, a scanned paper, or a screenshot, you can easily convert it into copyable text.
          </p>
  
          <h2>How to Use It</h2>
          <ol>
            <li>Go to <strong>ProImageToText</strong> (no sign-up needed).</li>
            <li>Click the upload area or drag and drop your image file.</li>
            <li>Click the <strong>“Extract Text”</strong> button.</li>
            <li>Copy or download the extracted text for free.</li>
          </ol>
  
          <h2>Why Use ProImageToText?</h2>
          <ul>
            <li><strong>100% Free:</strong> No hidden costs, no sign-up required.</li>
            <li><strong>Fast & Accurate:</strong> Advanced OCR gives you clean, editable text.</li>
            <li><strong>Secure:</strong> Your files are not saved — your data stays private.</li>
          </ul>
  
          <h2>Supported File Types</h2>
          <p>
            ProImageToText works with PNG, JPG, JPEG, and other common image formats.
          </p>
  
          <h2>Get Started Today</h2>
          <p>
            Stop typing text manually! Use ProImageToText to convert your images to text online for free — and boost your productivity.
          </p>
  
          <p>
            👉 <strong>Try it now:</strong> <a href="/" className="text-[#86B3BB]">Upload your image here</a>
          </p>
        </>
      )
    },
    {
      title: "Best Free & Paid OCR Tools in 2025 (Comparison)",
      slug: "best-ocr-tools-2025",
      summary: "Discover the top free and paid OCR tools available this year and see why ProImageToText is a top pick.",
      image: "/images/best-ocr-tools.png",
      content: (
        <>
          <p>
            Looking for the best OCR tools in 2025? We compared free and paid options to help you pick the right one for your needs.
          </p>
  
          <h2>What is OCR?</h2>
          <p>
            OCR (Optical Character Recognition) converts images or scanned documents into editable text.
          </p>
  
          <h2>Top Free OCR Tools</h2>
          <ul>
            <li><strong>ProImageToText:</strong> Free, online, fast, and secure.</li>
            <li><strong>Google Keep:</strong> Good for basic OCR on notes.</li>
            <li><strong>OnlineOCR.net:</strong> Supports multiple file types.</li>
          </ul>
  
          <h2>Top Paid OCR Tools</h2>
          <ul>
            <li><strong>Adobe Acrobat Pro:</strong> Great for PDF OCR and editing.</li>
            <li><strong>ABBYY FineReader:</strong> Powerful desktop OCR tool for professionals.</li>
          </ul>
  
          <h2>Why Choose ProImageToText?</h2>
          <p>
            For most everyday tasks, ProImageToText covers all your needs — free, simple, and no installation required.
          </p>
  
          <p>
            👉 <strong>Try it now:</strong> <a href="/" className="text-[#86B3BB]">Convert an image here</a>
          </p>
        </>
      )
    },
    {
      title: "Convert Handwriting to Text Online — Simple and Fast",
      slug: "convert-handwriting-to-text",
      summary: "Got handwritten notes? Learn how to quickly convert handwriting to editable text with ProImageToText.",
      image: "/images/handwriting-to-text.png",
      content: (
        <>
          <p>
            Handwritten notes can be hard to store and share. Luckily, converting handwriting to text is easy with ProImageToText.
          </p>
  
          <h2>Does OCR Work on Handwriting?</h2>
          <p>
            Yes! Modern OCR tools like ProImageToText handle clear handwriting well — just make sure your notes are neat and the image quality is good.
          </p>
  
          <h2>Steps to Convert Handwriting to Text</h2>
          <ol>
            <li>Scan or photograph your handwritten notes clearly.</li>
            <li>Upload the image to ProImageToText.</li>
            <li>Click <strong>“Extract Text”</strong> and let OCR do the work.</li>
            <li>Edit, copy, or save your text instantly.</li>
          </ol>
  
          <h2>Tips for Better Results</h2>
          <ul>
            <li>Use good lighting.</li>
            <li>Avoid shadows or blurry photos.</li>
            <li>Write clearly in block letters if possible.</li>
          </ul>
  
          <p>
            👉 <strong>Try it now:</strong> <a href="/" className="text-[#86B3BB]">Convert your notes here</a>
          </p>
        </>
      )
    },
    {
      title: "Extract Text from PDFs and Images — Complete Guide",
      slug: "extract-text-from-pdfs-images",
      summary: "Learn how to extract text from PDF files and images easily with this simple guide and free tools.",
      image: "/images/extract-text-pdfs-images.jpg",
      content: (
        <>
          <p>
            Have a scanned PDF or image with text you can’t copy? Here’s how to extract text easily.
          </p>
  
          <h2>PDF vs Image OCR</h2>
          <p>
            For PDFs, you can use PDF-specific OCR tools or convert PDF pages to images and use ProImageToText.
          </p>
  
          <h2>How to Extract Text from Images</h2>
          <ol>
            <li>Go to ProImageToText.</li>
            <li>Upload your image file.</li>
            <li>Click <strong>“Extract Text”</strong>.</li>
            <li>Copy or download your text.</li>
          </ol>
  
          <h2>Best Tools for PDF OCR</h2>
          <ul>
            <li>Adobe Acrobat Pro for editing directly.</li>
            <li>Online PDF to image converter + ProImageToText for free.</li>
          </ul>
  
          <p>
            👉 <strong>Start free:</strong> <a href="/" className="text-[#86B3BB]">Try our image OCR tool</a>
          </p>
        </>
      )
    },
    {
      title: "5 Ways to Copy Text from a Screenshot (No Typing Needed)",
      slug: "copy-text-from-screenshot",
      summary: "Stop typing screenshots manually — here are the best ways to copy text from any image instantly.",
      image: "/images/copy-text-screenshot.jpg",
      content: (
        <>
          <p>
            Need to copy text from a screenshot? Don’t waste time retyping — use these simple tricks.
          </p>
  
          <h2>1. Use ProImageToText</h2>
          <p>
            Drag your screenshot onto ProImageToText, hit <strong>“Extract Text”</strong> — done!
          </p>
  
          <h2>2. Google Keep OCR</h2>
          <p>
            Google Keep has a simple OCR function for images added as notes.
          </p>
  
          <h2>3. Microsoft OneNote OCR</h2>
          <p>
            OneNote can copy text from screenshots pasted into a note.
          </p>
  
          <h2>4. Mobile OCR Apps</h2>
          <p>
            Try free mobile apps for quick OCR on your phone.
          </p>
  
          <h2>5. Built-In Tools</h2>
          <p>
            Some phones (like Samsung) have text extractor features in the gallery.
          </p>
  
          <p>
            👉 <strong>Fastest way:</strong> <a href="/" className="text-[#86B3BB]">Try ProImageToText now</a>
          </p>
        </>
      )
    }
  ];

export default function Article() {
    const { slug } = useParams();
    const article = articles.find((a) => a.slug === slug);

    if (!article) return <p className="p-6">Article not found.</p>;

    return (
        <section className="max-w-5xl mt-5 md:mt-20 mx-auto p-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {article.title}
          </h1>
          
        <div className='bg-[#45bfd1] rounded my-8 shadow'>
        {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-100 "
            />
          )}
        </div>
    
          <div className="prose prose-lg dark:prose-invert">
            {article.content}
          </div>
        </section>
      );
}
