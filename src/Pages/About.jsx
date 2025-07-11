import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <main className="max-w-6xl py-12 mx-auto p-6 prose dark:prose-invert">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>About Us | Pro Image to Text</title>
        <meta
          name="description"
          content="Learn more about Pro Image to Text, a free online OCR tool developed by Kaleemullah Ahsan for fast, secure, and private image-to-text conversion."
        />
      </Helmet>

      {/* ✅ Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-8">
        <ol className="!list-none inline-flex p-0 !m-0" >
          <li>
            <Link to="/" className="hover:underline text-[#86B3BB]">Home</Link>
          </li>
          <li><span className="mx-2">/</span></li>
          <li aria-current="page" className="text-gray-700 dark:text-gray-300">About</li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">About Pro Image to Text</h1>

      <p>
        <strong>Pro Image to Text</strong> is a free, fast, and secure online OCR tool that lets you extract text from images in seconds.
        It’s built for students, professionals, and anyone who needs quick text conversion with full privacy.
      </p>

      <p>
        This project is developed and maintained by{' '}
        <a
          href="https://kaleemweb.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#86B3BB] hover:underline font-semibold"
        >
          Kaleemullah Ahsan
        </a>
        , a passionate web developer.
      </p>
    </main>
  );
}
