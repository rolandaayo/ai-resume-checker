import Image from 'next/image';

const Hero = () => {
  return (
    <div className="bg-[#07737C] min-h-[50vh] pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="space-x-2 mb-6">
              <button className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm">FREE TOOLS</button>
              <button className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm">RESUME CHECKER</button>
              <button className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm">RESUME SEARCH</button>
            </div>
            <h1 className="text-5xl font-bold text-white mb-2">
              AI Resume{' '}
              <span className="text-blue-600">Checker</span>
            </h1>
            <p className="text-white/90 text-lg mb-8">
              Get detailed feedback on how to resume your resume for better job prospects.
            </p>
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
              Get Started
            </button>
          </div>
          <div className="relative">
            <Image
              src="/images/resume-preview.png"
              alt="Resume Preview"
              width={500}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
