import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
<section className="max-w-6xl py-12 mx-auto p-6 prose dark:prose-invert">
      {/* ✅ Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:underline text-[#86B3BB]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 dark:text-gray-300">Terms of Service</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p>
        By using Pro Image to Text, you agree to use this tool only for legal and ethical purposes.
        We do not take responsibility for any misuse or content extracted.
      </p>
      <p>
        We reserve the right to update these terms at any time. Continued use of the site means you accept any changes.
      </p>
    </section>
  );
}
