'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    ['link'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'indent',
  'link'
];

const ResumeEditor = ({ content, onContentChange, isEditing }) => {
  if (!isEditing) {
    return (
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <QuillEditor
        value={content}
        onChange={onContentChange}
        modules={modules}
        formats={formats}
        theme="snow"
        className="min-h-[500px]"
      />
    </div>
  );
};

export default ResumeEditor;
