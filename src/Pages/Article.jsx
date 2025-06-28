import { useParams } from 'react-router-dom';

const articles = [
    // ✅ Put this in your articles array
    {
        title: "How to Convert Images to Text Online for Free (Step-by-Step Guide)",
        slug: "convert-images-to-text-online",
        summary: "Learn how to use ProImageToText to extract text from any image or scanned document in seconds.",
        image: "/images/convert-images-to-text.jpg",
        content: (
            <>
                <p>
                    Do you have a photo, screenshot, or scanned document that you wish you could turn into editable text? Good news — with ProImageToText, you can convert images to text online for free, in just a few seconds.
                </p>

                <h2>What is ProImageToText?</h2>
                <p>
                    ProImageToText is a free online OCR (Optical Character Recognition) tool that extracts text from images instantly. Whether it’s a photo of a handwritten note, a scanned paper, or a screenshot, you can easily convert it into copyable text.
                </p>

                <h2>How to Use It</h2>
                <ol>
                    <li>Go to <strong>ProImageToText</strong> (no sign-up needed).</li>
                    <li>Click the upload area or drag and drop your image file.</li>
                    <li>Click the <strong>“Extract Text”</strong> button.</li>
                    <li>Copy or download the extracted text for free.</li>
                </ol>

                <h2>Why Use ProImageToText?</h2>
                <ul>
                    <li><strong>100% Free:</strong> No hidden costs, no sign-up required.</li>
                    <li><strong>Fast & Accurate:</strong> Advanced OCR gives you clean, editable text.</li>
                    <li><strong>Secure:</strong> Your files are not saved — your data stays private.</li>
                </ul>

                <h2>Supported File Types</h2>
                <p>
                    ProImageToText works with PNG, JPG, JPEG, and other common image formats.
                </p>

                <h2>Get Started Today</h2>
                <p>
                    Stop typing text manually! Use ProImageToText to convert your images to text online for free — and boost your productivity.
                </p>

                <p>
                    👉 <strong>Try it now:</strong> <a href="/" className="text-[#86B3BB]">Upload your image here</a>
                </p>
            </>
        )
    },

];


export default function Article() {
    const { slug } = useParams();
    const article = articles.find((a) => a.slug === slug);

    if (!article) return <p className="p-6">Article not found.</p>;

    return (
        <section className="max-w-5xl mt-5 md:mt-20 mx-auto p-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {article.title}
          </h1>
          
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full rounded my-8 shadow"
            />
          )}
    
          <div className="prose prose-lg dark:prose-invert">
            {article.content}
          </div>
        </section>
      );
}
