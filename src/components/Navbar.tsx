import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 text-white bg-[#118F9A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl text-white font-bold">
              AI RESUME CHECKER
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium">
                HOME
              </Link>
              <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium">
                ABOUT
              </Link>
              <Link href="/services" className="px-3 py-2 rounded-md text-sm font-medium">
                SERVICES
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
