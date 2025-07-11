import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Blog() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/articles.json')
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error('Failed to load articles:', err));
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-12">
      {/* ✅ Helmet for SEO */}
      <Helmet>
        <title>Blog - Tips & Guides | ProImageToText</title>
        <meta
          name="description"
          content="Read our latest blog articles on converting images to text, OCR tools, and productivity tips. Stay updated with ProImageToText guides."
        />
      </Helmet>

      {/* ✅ Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-8">
        <ol className="!list-none inline-flex p-0 !m-0">
          <li>
            <Link to="/" className="hover:underline text-[#86B3BB]">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li aria-current="page" className="text-gray-700 dark:text-gray-300">
            Blog
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 dark:text-white">
        Blog
      </h1>

      {articles.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Loading articles...</p>
      ) : (
        <ul className="space-y-10 m-0">
          {articles.map((article) => (
            <li
              key={article.slug}
              className="flex flex-col md:flex-row gap-6 border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow hover:shadow-md transition"
            >
              <Link
                to={`/blog/${article.slug}`}
                className="w-full md:w-72 flex-shrink-0"
              >
                <img
                  src={article.image}
                  alt={article.title || 'Blog article image'}
                  className="w-full h-65 md:h-full object-cover object-center"
                  loading="lazy"
                />
              </Link>

              <div className="flex flex-col justify-between p-6 flex-1">
                <div>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="block text-2xl font-semibold text-gray-900 dark:text-white hover:text-[#0f869e] transition"
                  >
                    {article.title}
                  </Link>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    {article.summary}
                  </p>
                </div>

                <Link
                  to={`/blog/${article.slug}`}
                  className="max-w-max inline-flex items-center gap-2 mt-6 text-sm font-semibold bg-[#A8DFE9] text-white px-5 py-3 rounded hover:bg-[#0f869e] transition"
                >
                  Read More{' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
