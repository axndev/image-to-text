export default function Footer() {
  return (
    <footer className="mt-16 bg-white border-t border-gray-200 dark:border-gray-700 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Pro Image to Text. Built by{' '}
          <a
            href="https://kaleemweb.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#86b3bb] hover:underline"
          >
            kaleemweb.netlify.app
          </a>
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
          Want to support? Hire me for web dev
          <i className="pi pi-arrow-right text-[#86b3bb]"></i>{' '}
          <a
            href="mailto:kaleemullahahsan0@gmail.com"
            className="font-medium text-[#86b3bb] hover:underline"
          >
            Email me
          </a>
        </p>
      </div>
    </footer>
  );
}
