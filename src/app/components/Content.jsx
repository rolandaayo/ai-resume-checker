'use client'
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import ResumeEditor from './ResumeEditor';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const Content = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resumeContent, setResumeContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = pdf.getPages();
      
      // For demo purposes - in production, implement proper text extraction
      const text = `Sample text extracted from PDF with ${pages.length} pages.
        Skills: JavaScript, React, Node.js
        Experience: 3 years of development
        Education: Bachelor's degree in Computer Science
        Projects: Built e-commerce platform, Developed mobile app`;
      
      setResumeContent(text);
      return text;
    } catch (error) {
      console.error('Error processing PDF:', error);
      throw new Error('Failed to process PDF. Please make sure it is a valid PDF file.');
    }
  };

  const analyzeResume = async (text) => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze resume');
      }

      // Validate the response data
      if (!data.score || !data.improvements || !data.foundKeywords) {
        throw new Error('Invalid analysis response format');
      }

      return data;
    } catch (error) {
      console.error('Error analyzing resume:', error);
      throw new Error(
        error.message || 'Failed to analyze resume. Please try again.'
      );
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    setFile(selectedFile);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      setLoading(true);
      setError(null);
      setAnalysis(null); // Reset previous analysis

      // Extract text from PDF
      let text;
      try {
        text = await extractTextFromPDF(file);
        if (!text || text.trim().length === 0) {
          throw new Error('Could not extract text from the PDF. Please ensure it contains selectable text.');
        }
      } catch (pdfError) {
        throw new Error('Error processing PDF: ' + (pdfError.message || 'Please ensure the file is a valid PDF with selectable text.'));
      }

      // Analyze the text
      try {
        const result = await analyzeResume(text);
        setAnalysis(result);
        setResumeContent(text);
        setIsEditing(true);
      } catch (analysisError) {
        throw new Error('Error analyzing resume: ' + (analysisError.message || 'Please try again.'));
      }
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (content) => {
    setResumeContent(content);
  };

  const handleDownload = () => {
    const blob = new Blob([resumeContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'improved-resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-black">Upload Your Resume</h2>
            <p className="text-gray-600">
              Our AI will analyze your resume and provide detailed feedback to help you stand out.
            </p>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-200"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files[0];
                  if (droppedFile && droppedFile.type === 'application/pdf') {
                    const input = document.getElementById('resume-upload');
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(droppedFile);
                    input.files = dataTransfer.files;
                    handleFileChange({ target: { files: [droppedFile] } });
                  } else {
                    setError('Please upload a PDF file');
                  }
                }}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-700"
                >
                  {file ? file.name : 'Click to upload or drag and drop'}
                </label>
                <p className="text-sm text-gray-500 mt-2">PDF only (Max 5MB)</p>
              </div>
              <button
                type="submit"
                disabled={!file || loading}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-md text-white font-medium transition-all duration-200 ${
                  !file || loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Resume...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                    </svg>
                    Analyze & Update Resume
                  </span>
                )}
              </button>
            </form>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            {analysis ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-black">Resume Score</h3>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-black">{analysis.score}</span>
                    <span className="text-gray-500 ml-1">/100</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-black">Found Keywords</h3>
                  {Object.entries(analysis.foundKeywords).map(([category, words]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="text-sm font-medium text-black capitalize">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {words.map((word, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-black text-sm rounded-full"
                          >
                            {word}
                          </span>
                        ))}
                        {words.length === 0 && (
                          <span className="text-gray-500 text-sm">No {category} keywords found</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-black">Areas for Improvement</h3>
                  {analysis.improvements && Object.entries(analysis.improvements).map(([category, items]) => (
                    items && items.length > 0 && (
                      <div key={category} className="mb-4">
                        <h4 className="text-lg font-medium text-black capitalize mb-2">{category}</h4>
                        <ul className="space-y-2">
                          {items.map((item, index) => (
                            <li key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                              <span className="text-black mr-2">•</span>
                              <span className="text-black">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  ))}
                </div>

                {isEditing && (
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-black">Edit Your Resume</h3>
                      <div className="space-x-4">
                        <button
                          onClick={() => setShowPreview(!showPreview)}
                          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          {showPreview ? 'Hide Preview' : 'Show Preview'}
                        </button>
                        <button
                          onClick={handleDownload}
                          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                          Download PDF
                        </button>
                      </div>
                    </div>
                    
                    <ResumeEditor
                      content={resumeContent}
                      onContentChange={handleContentChange}
                      isEditing={true}
                    />

                    {showPreview && (
                      <div className="mt-8">
                        <h3 className="text-xl font-semibold text-black mb-4">Preview</h3>
                        <div className="border rounded-lg p-4">
                          <PDFViewer style={{ width: '100%', height: '500px' }}>
                            <Document>
                              <Page size="A4" style={styles.page}>
                                <View style={styles.section}>
                                  <Text>{resumeContent}</Text>
                                </View>
                              </Page>
                            </Document>
                          </PDFViewer>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p className="mt-2">Upload your resume to get detailed analysis and suggestions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
