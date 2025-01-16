import Image from 'next/image';

const Companies = () => {
  return (
    <div className="bg-[#07737C] pb-24 backdrop-blur-sm py-16">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white text-center mb-12">
          Get hired by top companies worldwide.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          <Image src="/images/coinbase.png" alt="Coinbase" width={120} height={40} className="w-auto h-8" />
          <Image src="/images/spotify.png" alt="Spotify" width={120} height={40} className="w-auto h-8" />
          <Image src="/images/microsoft.png" alt="Microsoft" width={120} height={40} className="w-auto h-8" />
          <Image src="/images/meta.png" alt="Meta" width={120} height={40} className="w-auto h-8" />
          <Image src="/images/spacex.png" alt="SpaceX" width={120} height={40} className="w-auto h-8" />
        </div>
      </div>
    </div>
  );
};

export default Companies;
