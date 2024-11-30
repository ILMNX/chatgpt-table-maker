'use client';

import React, { useState } from 'react';

export default function TableConverter() {
  const [inputText, setInputText] = useState('');
  const [outputHtml, setOutputHtml] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const convertToTable = () => {
    try {
      // ... existing conversion logic ...
    } catch (error) {
      console.error('Error converting table:', error);
      setOutputHtml('<p class="text-red-500">Error converting text to table. Please check input format.</p>');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputHtml);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Card container */}
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Table Converter
          </h5>
          
          {/* Alert */}
          {showAlert && (
            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
              <span className="font-medium">Success!</span> Table HTML copied to clipboard.
            </div>
          )}

          {/* Input Section */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Paste table text
            </label>
            <textarea 
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-mono"
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your table text here..."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={convertToTable}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Convert to Table
            </button>
            
          </div>

          {/* Output Preview */}
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Preview
            </label>
            
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
              <div 
                className="overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: outputHtml }}
              />
            </div>
            
          </div>
          <br />
          <button
              onClick={copyToClipboard}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Copy HTML
            </button>
        </div>
      </div>
    </div>
  );
}