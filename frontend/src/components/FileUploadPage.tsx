"use client";

import { useState } from 'react';
import { Upload, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const FileUploadPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    );
    
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(
      file => file.type === 'application/pdf'
    );
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    setFiles(prev => [...prev, ...newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'pending'
    }))]);
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const uploadFiles = async () => {
    setUploadStatus('uploading');
    // Simulate upload progress
    await Promise.all(files.map(async (file) => {
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, progress } : f
        ));
      }
    }));
    setUploadStatus('success');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload PDFs</h1>
          <p className="text-gray-500 mt-1">Upload your PDFs to extract tabular data</p>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-xl p-8
          flex flex-col items-center justify-center
          transition-colors duration-200 ease-in-out
          ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}
        `}
      >
        <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
          <Upload className="w-8 h-8 text-indigo-600" />
        </div>
        <p className="text-gray-700 font-medium mb-2">Drag and drop your PDFs here</p>
        <p className="text-gray-500 text-sm mb-4">or</p>
        <label className="cursor-pointer">
          <span className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition">
            Browse Files
          </span>
          <input
            type="file"
            className="hidden"
            accept=".pdf"
            multiple
            onChange={handleFileInput}
          />
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Selected Files</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {files.map((file) => (
              <div key={file.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {file.progress > 0 && (
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={uploadFiles}
              disabled={uploadStatus === 'uploading'}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadStatus === 'uploading' ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Upload Files</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Status Messages */}
      {uploadStatus === 'success' && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>Files uploaded successfully!</span>
        </div>
      )}
      {uploadStatus === 'error' && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5" />
          <span>Error uploading files. Please try again.</span>
        </div>
      )}
    </div>
  );
};

export default FileUploadPage;