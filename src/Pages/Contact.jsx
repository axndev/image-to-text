import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  return (
    <main className="max-w-6xl py-12 mx-auto p-6 prose dark:prose-invert">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>Contact Us | Pro Image to Text</title>
        <meta
          name="description"
          content="Contact Pro Image to Text for any questions, suggestions, or support inquiries. We’d love to hear from you!"
        />
      </Helmet>

      {/* ✅ Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-8">
        <ol className="!list-none inline-flex p-0 !m-0" >
          <li>
            <Link to="/" className="hover:underline text-[#86B3BB]">Home</Link>
          </li>
          <li><span className="mx-2">/</span></li>
          <li aria-current="page" className="text-gray-700 dark:text-gray-300">Contact</li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
      <p>
        Have questions, feedback, or suggestions? Reach out anytime — we’d love to hear from you.
      </p>
      
      <ul className="space-y-2">
        <li>
          <strong>Email:</strong>{' '}
          <a
            href="mailto:kaleemullahahsan0@gmail.com"
            className="text-[#86B3BB] hover:underline"
          >
            kaleemullahahsan0@gmail.com
          </a>
        </li>
        <li>
          <strong>Portfolio:</strong>{' '}
          <a
            href="https://kaleemweb.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#86B3BB] hover:underline"
          >
            kaleemweb.netlify.app
          </a>
        </li>
      </ul>
    </main>
  );
}
