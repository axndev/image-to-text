import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section className="max-w-6xl py-12 mx-auto p-6 prose dark:prose-invert">
      {/* ✅ Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:underline text-[#86B3BB]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 dark:text-gray-300">About</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">About Pro Image to Text</h1>
      <p>
        Pro Image to Text is a free online OCR tool that lets you easily extract text from images in seconds.
        Built for students, professionals, and anyone who needs quick text conversion — with privacy and speed.
      </p>
      <p>
        This project is developed and maintained by{' '}
        <a
          href="https://kaleemweb.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#86B3BB] hover:underline"
        >
          Kaleemullah Ahsan
        </a>.
      </p>
    </section>
  );
}
