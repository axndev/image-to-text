import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <section className="max-w-6xl py-12 mx-auto p-6 prose dark:prose-invert">
      {/* ✅ Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:underline text-[#86B3BB]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 dark:text-gray-300">Contact</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p>
        Have questions or suggestions? Reach out anytime!
      </p>
      <ul>
        <li>
          Email:{' '}
          <a
            href="mailto:kaleemullahahsan0@gmail.com"
            className="text-[#86B3BB] hover:underline"
          >
            kaleemullahahsan0@gmail.com
          </a>
        </li>
        <li>
          Portfolio:{' '}
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
    </section>
  );
}
