export default function Layout({ children, onTitleClick, showHeader = true }) {
  return (
    <div className="relative bg-gradient-to-br from-fuchsia-100 via-yellow-100 to-sky-100 font-sans overflow-x-hidden">
      {/* Structure: flex column that fills full height */}
      <div className="flex flex-col min-h-screen">

        {/* Background decorations (inside flex wrapper to avoid overflow) */}
        <div
          className="absolute inset-0 overflow-hidden -z-10 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute w-[280px] h-[280px] bg-pink-300 opacity-30 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>
          <div className="absolute w-[280px] h-[280px] bg-indigo-300 opacity-30 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>
        </div>

        {/* Optional Header */}
        {showHeader && (
          <header className="px-4 py-6">
            <div
              onClick={onTitleClick}
              className="max-w-6xl mx-auto flex items-center cursor-pointer group"
            >
              <span className="text-3xl mr-2">💸</span>
              <h1 className="text-2xl font-extrabold text-indigo-700 group-hover:text-indigo-900 transition">
                Fintrack
              </h1>
            </div>
          </header>
        )}

        {/* Main content: grows to push footer if needed */}
        <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>

        {/* Footer sticks to bottom unless pushed down */}
        <footer className="text-center text-sm text-gray-500 py-6">
          © {new Date().getFullYear()} Fintrack. Built with 💖 for personal use.
        </footer>
      </div>
    </div>
  );
}
