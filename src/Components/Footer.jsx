export default function Footer() {
    return (
      <footer className="mt-12 py-6 text-center border-t border-gray-300 dark:border-gray-700 flex gap-2 items-center  flex-col md:flex-row justify-center ">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Pro Image to Text. Built by{' '}
          <a
            href="https://kaleemweb.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium"
            style={{ color: 'rgb(134 179 187)' }}
          >
            kaleemweb.netlify.app
          </a>
        </p>
         <span className="hidden md:block">|</span> 
        <a
          href="https://www.buymeacoffee.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-medium"
          style={{ color: 'rgb(134 179 187)' }}
        >
          ☕ Buy me a coffee
        </a>
      </footer>
    );
  }
  