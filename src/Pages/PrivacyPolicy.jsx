export default function PrivacyPolicy() {
    return (
      <section className="max-w-5xl mt-5 md:mt-20 mx-auto p-6 prose dark:prose-invert">
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
          <a
            href="/contact"
            style={{ color: 'rgb(134 179 187)' }}
          >
            contact us
          </a>.
        </p>
      </section>
    );
  }
  