import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  return (
    <main className="max-w-6xl py-12 mx-auto p-6 prose dark:prose-invert">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>Privacy Policy | Pro Image to Text</title>
        <meta
          name="description"
          content="Read the Pro Image to Text privacy policy. We value your privacy. Your images and text are never stored or shared. All processing happens securely."
        />
      </Helmet>

      {/* ✅ Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-8">
        <ol className="!list-none inline-flex p-0 !m-0" >
          <li>
            <Link to="/" className="hover:underline text-[#86B3BB]">Home</Link>
          </li>
          <li><span className="mx-2">/</span></li>
          <li aria-current="page" className="text-gray-700 dark:text-gray-300">Privacy Policy</li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>

      <p>
        Your privacy is important to us. <strong>Pro Image to Text</strong> does not store your uploaded images or extracted text.
        All processing happens securely in your browser, and files are never saved on our servers.
      </p>

      <p>
        We may use minimal cookies to improve your experience. By using this site, you consent to our privacy practices.
      </p>

      <p>
        For any questions or concerns, please{' '}
        <Link
          to="/contact"
          className="text-[#86B3BB] hover:underline font-semibold"
        >
          contact us
        </Link>.
      </p>
    </main>
  );
}
