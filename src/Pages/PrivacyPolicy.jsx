import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <section className="max-w-6xl py-12 mx-auto p-6 prose dark:prose-invert">
      {/* ✅ Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:underline text-[#86B3BB]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 dark:text-gray-300">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p>
        Your privacy is important to us. Pro Image to Text does not store your uploaded images or extracted text.
        All processing happens securely and your files are deleted automatically.
      </p>
      <p>
        We may use cookies to improve the experience. By using this site you agree to our policy.
      </p>
      <p>
        For questions, please{' '}
        <Link
          to="/contact"
          className="text-[#86B3BB] hover:underline"
        >
          contact us
        </Link>.
      </p>
    </section>
  );
}
