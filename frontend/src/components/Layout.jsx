function Layout({ children, onTitleClick, showHeader = true }) {
  return (
    <div className="relative bg-gradient-to-br from-fuchsia-100 via-yellow-100 to-sky-100 font-sans overflow-x-hidden">
      <div className="flex flex-col min-h-screen">

        <div
          className="absolute inset-0 overflow-hidden -z-10 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute w-[280px] h-[280px] bg-pink-300 opacity-30 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>
          <div className="absolute w-[280px] h-[280px] bg-indigo-300 opacity-30 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>
        </div>

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

        <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>

        <footer className="text-center text-sm text-gray-500 py-6">
          © {new Date().getFullYear()} RandomFintrack. Built with 💖 for personal use.
        </footer>
      </div>
    </div>
  );
}

export default Layout;