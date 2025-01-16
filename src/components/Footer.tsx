import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#118F9A] pt-28 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Join Us To Build The Framework For Autonomous Intelligence
            </h3>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">FRAMEWORK</h4>
            <ul className="space-y-2">
              <li><Link href="/docs">Doc</Link></li>
              <li><Link href="/examples">Examples</Link></li>
              <li><Link href="/use-cases">Use Cases</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Cloud</h4>
            <ul className="space-y-2">
              <li><Link href="/signup">Sign Up</Link></li>
              <li><Link href="/login">Log In</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">ABOUT</h4>
            <ul className="space-y-2">
              <li><Link href="/company">Company</Link></li>
              <li><Link href="/enterprise">Enterprise</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
