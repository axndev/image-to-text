import { Link } from 'react-router-dom';

const articles = [
  {
    title: "How to Convert Images to Text Online for Free (Step-by-Step Guide)",
    slug: "convert-images-to-text-online",
    summary: "Learn how to use ProImageToText to extract text from any image or scanned document in seconds.",
    image: "/images/convert-images-to-text.png"
  },
  {
    title: "Best Free & Paid OCR Tools in 2025 (Comparison)",
    slug: "best-ocr-tools-2025",
    summary: "Discover the top free and paid OCR tools available this year and see why ProImageToText is a top pick.",
    image: "/images/best-ocr-tools.png"
  },
  {
    title: "Convert Handwriting to Text Online — Simple and Fast",
    slug: "convert-handwriting-to-text",
    summary: "Got handwritten notes? Learn how to quickly convert handwriting to editable text with ProImageToText.",
    image: "/images/handwriting-to-text.png"
  },
  {
    title: "Extract Text from PDFs and Images — Complete Guide",
    slug: "extract-text-from-pdfs-images",
    summary: "Learn how to extract text from PDF files and images easily with this simple guide and free tools.",
    image: "/images/extract-text-pdfs-images.jpg"
  },
  {
    title: "5 Ways to Copy Text from a Screenshot (No Typing Needed)",
    slug: "copy-text-from-screenshot",
    summary: "Stop typing screenshots manually — here are the best ways to copy text from any image instantly.",
    image: "/images/copy-text-screenshot.jpg"
  }
];

export default function Blog() {
  return (
    <section className="max-w-5xl mt-5 md:mt-20 mx-auto p-6 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-6 m-0">
        {articles.map((article) => (
          <li key={article.slug} className="border-b pb-4 flex flex-col md:flex-row gap-4 items-center">
            <img
              src={article.image}
              alt={article.title}
              className="w-full md:w-150 md:max-w-80 rounded shadow"
            />
            <div className='flex flex-col gap-2'>
              <Link
                to={`/blog/${article.slug}`}
                className="text-xl font-semibold hover:text-[#A8DFE9]"
              >
                {article.title}
              </Link>
              <p className='mt-2'>{article.summary}</p>
              <Link
                to={`/blog/${article.slug}`}
                className="text-base font-semibold hover:text-[#A8DFE9] bg-[#A8DFE9] max-w-max px-6 py-3 rounded text-white mt-2 hover:bg-[#0f869e]"
              >
                Read More
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
