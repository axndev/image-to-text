import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!article) return <p className="p-6">Article not found.</p>;

  return (
    <section className="max-w-6xl py-12 mx-auto p-6 prose dark:prose-invert">
      {/* ✅ Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:underline text-[#86B3BB]">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="hover:underline text-[#86B3BB]">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 dark:text-gray-300">{article.title}</span>
      </nav>

      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        {article.title}
      </h1>

      <div className="bg-[#45bfd1] rounded my-8 shadow">
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-100"
          />
        )}
      </div>

      <div
        className="prose prose-lg dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </section>
  );
}
