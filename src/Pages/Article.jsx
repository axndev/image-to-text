import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch('/articles.json');
        const data = await res.json();
        const found = data.find((a) => a.slug === slug);
        setArticle(found);
      } catch (err) {
        console.error('Failed to fetch article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return <p className="p-6 text-gray-600 dark:text-gray-400">Loading...</p>;
  }

  if (!article) {
    return (
      <>
        <Helmet>
          <title>Article Not Found | ProImageToText</title>
          <meta name="description" content="The article you’re looking for does not exist." />
        </Helmet>
        <main className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-gray-600 dark:text-gray-400">Sorry, the article was not found.</p>
          <Link
            to="/blog"
            className="inline-block mt-4 text-[#86B3BB] hover:underline"
          >
            ← Back to Blog
          </Link>
        </main>
      </>
    );
  }

  return (
    <main className="max-w-6xl py-12 mx-auto px-6">
      {/* ✅ Helmet for SEO */}
      <Helmet>
        <title>{article.metaTitle || article.title}</title>
        <meta name="description" content={article.metaDescription} />
      </Helmet>

      {/* ✅ Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-8">
        <ol className="!list-none inline-flex p-0 !m-0" >
          <li>
            <Link to="/" className="hover:underline text-[#86B3BB]">
              Home
            </Link>
          </li>
          <li><span className="mx-2">/</span></li>
          <li>
            <Link to="/blog" className="hover:underline text-[#86B3BB]">
              Blog
            </Link>
          </li>
          <li><span className="mx-2">/</span></li>
          <li aria-current="page" className="text-gray-700 dark:text-gray-300">
            {article.title}
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        {article.title}
      </h1>

      {article.image && (
        <figure className="rounded overflow-hidden shadow mb-8">
          <img
            src={article.image}
            alt={article.title || 'Article image'}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </figure>
      )}

      <article
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </main>
  );
}
