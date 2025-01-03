import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">ResumeAI</h3>
            <p className="text-gray-600 text-sm">
              Empowering job seekers with AI-powered resume analysis and optimization.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Features</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Resume Analysis</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">AI Suggestions</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Industry Insights</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">LinkedIn</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
