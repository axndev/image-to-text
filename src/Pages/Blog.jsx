import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/articles.json')
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error('Failed to load articles:', err));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
      {/* ✅ Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:underline text-[#86B3BB]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 dark:text-gray-300">Blog</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 dark:text-white">
        Blog
      </h1>

      {articles.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Loading articles...</p>
      ) : (
        <ul className="!space-y-10 !m-0">
          {articles.map((article) => (
            <li
              key={article.slug}
              className="flex flex-col md:flex-row gap-6 border bg-white border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow hover:shadow-md transition"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full md:w-72 h-65 md:h-auto object-cover object-center"
              />
              <div className="flex flex-col justify-between p-6">
                <div>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="block text-2xl font-semibold text-gray-900 dark:text-white hover:text-[#0f869e] transition"
                  >
                    {article.title}
                  </Link>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">{article.summary}</p>
                </div>
                <Link
                  to={`/blog/${article.slug}`}
                  className="max-w-max inline-flex items-center gap-2 mt-6 text-sm font-semibold bg-[#A8DFE9] text-white px-5 py-3 rounded hover:bg-[#0f869e] transition"
                >
                  Read More <i className="pi pi-arrow-right text-base"></i>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
