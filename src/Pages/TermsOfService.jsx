import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function TermsOfService() {
  return (
    <main className="max-w-6xl py-12 mx-auto p-6 prose dark:prose-invert">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>Terms of Service | Pro Image to Text</title>
        <meta
          name="description"
          content="Review the Terms of Service for using Pro Image to Text. Understand your responsibilities and our rights."
        />
      </Helmet>

      {/* ✅ Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-8">
        <ol className="!list-none inline-flex p-0 !m-0" >
          <li>
            <Link to="/" className="hover:underline text-[#86B3BB]">Home</Link>
          </li>
          <li><span className="mx-2">/</span></li>
          <li aria-current="page" className="text-gray-700 dark:text-gray-300">Terms of Service</li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
      <p>
        By using Pro Image to Text, you agree to use this tool only for legal and ethical purposes.
        We do not take responsibility for any misuse or content extracted.
      </p>
      <p>
        We reserve the right to update these terms at any time. Continued use of the site means you accept any changes.
      </p>
    </main>
  );
}
