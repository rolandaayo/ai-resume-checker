import Image from 'next/image';

const Features = () => {
  return (
    <div className="bg-[#118F9A] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            You are 80% more likely to get hired if you use AIApply
          </h2>
          <p className="text-white/80">
            We specialize in providing advanced AI tools tailored for job seekers
          </p>
        </div>

        <div className="space-y-8">
          {/* Comprehensive Resume Analysis */}
          <div className="bg-[#07737C] backdrop-blur-sm rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/images/resume-analysis.png"
                  alt="Resume Analysis"
                  width={300}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Comprehensive Resume Analysis
                </h3>
                <p className="text-white/80 mb-4">
                  Gain a thorough evaluation of your resume s content, structure
                  and expert help via AI technology that identifies areas for improvement and
                  suggests actionable steps to enhance your CV s effectiveness
                </p>
                <ul className="text-white/80 space-y-2">
                  <li>Detailed Feedback</li>
                  <li>Content Evaluation</li>
                  <li>Structural Insights</li>
                </ul>
                <button className="mt-6 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors">
                  Get Involved
                </button>
              </div>
            </div>
          </div>

          {/* ATS Compatibility Check */}
          <div className="bg-[#07737C] backdrop-blur-sm rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ATS Compatibility Check
                </h3>
                <p className="text-white/80 mb-4">
                  Ensure your resume passes through Applicant Tracking
                  System (ATS) with higher success rates. Our AI analyzes your
                  CV against common ATS algorithms, suggests keywords and
                  formatting to increase your chances of getting noticed by
                  recruiters.
                </p>
                <ul className="text-white/80 space-y-2">
                  <li>ATS Optimization</li>
                  <li>Keyword Enhancement</li>
                  <li>Formatting Advice</li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <Image
                  src="/images/ats-check.png"
                  alt="ATS Check"
                  width={300}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
