import { Link } from 'react-router-dom';

const articles = [
    {
        title: "How to Convert Images to Text Online for Free (Step-by-Step Guide)",
        slug: "convert-images-to-text-online",
        summary: "Learn how to use ProImageToText to extract text from any image or scanned document in seconds.",
        image: "/images/convert-images-to-text.jpg"
    },
];

export default function Blog() {
    return (
        <section className="max-w-5xl mt-5 md:mt-20 mx-auto p-6 prose dark:prose-invert">
            <h1 className="text-3xl font-bold mb-6">Blog</h1>
            <ul className="space-y-6">
                {articles.map((article) => (
                    <li key={article.slug} className="border-b pb-4 flex flex-col md:flex-row gap-4 items-center">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full md:w-150 h-full rounded shadow"
                        />
                        <div>
                            <Link
                                to={`/blog/${article.slug}`}
                                className="text-xl font-semibold hover:text-[#A8DFE9]"
                            >
                                {article.title}
                            </Link>
                            <p className='mt-2'>{article.summary}</p>
                        </div>
                    </li>
                ))}
            </ul>

        </section>
    );
}
