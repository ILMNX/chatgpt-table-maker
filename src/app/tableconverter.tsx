'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function TableConverter() {
  const [inputText, setInputText] = useState('');
  const [outputHtml, setOutputHtml] = useState('');
  const [outputWordFriendly, setOutputWordFriendly] = useState('');
  const [conversionFormat, setConversionFormat] = useState('html');

  const convertToTable = () => {
    try {
      const rows = inputText.trim().split('\n');
      if (rows.length === 0) {
        setOutputHtml('<p class="text-red-500">Please enter some text</p>');
        return;
      }

      const tableData = rows.map(row =>
        row.split(/\t|(?<=\S)\s{2,}(?=\S)/).map(cell => cell.trim()).filter(Boolean)
      );

      if (tableData.some(row => row.length !== tableData[0].length)) {
        setOutputHtml('<p class="text-red-500">All rows must have the same number of columns</p>');
        return;
      }

      if (conversionFormat === 'html') {
        const tableHtml = `
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                ${tableData[0].map(header => `
                  <th scope="col" class="px-6 py-3">
                    ${header}
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${tableData.slice(1).map(row => `
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  ${row.map(cell => `
                    <td class="px-6 py-4">
                      ${cell}
                    </td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
        setOutputHtml(tableHtml);
        setOutputWordFriendly('');  // Clear word-friendly content
      } else if (conversionFormat === 'word-friendly') {
        const tableWord = `
          <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
            <thead>
              <tr style="background-color: #f2f2f2; text-align: left;">
                ${tableData[0].map(header => `
                  <th style="border: 1px solid #ddd; padding: 8px;">
                    ${header}
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${tableData.slice(1).map(row => `
                <tr>
                  ${row.map(cell => `
                    <td style="border: 1px solid #ddd; padding: 8px;">
                      ${cell}
                    </td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
        setOutputWordFriendly(tableWord);
        setOutputHtml('');  // Clear HTML content
      }
    } catch (error) {
      console.error('Error converting table:', error);
      setOutputHtml('<p class="text-red-500">Error converting text to table. Please check input format.</p>');
      setOutputWordFriendly('');  // Clear word-friendly content
    }
  };

  const copyToClipboard = async () => {
    const contentToCopy = conversionFormat === 'html' ? outputHtml : outputWordFriendly;

    if (!contentToCopy.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Nothing to copy',
        text: 'Try adding some text to convert!',
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(contentToCopy);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Preview copied to clipboard.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to copy',
        text: 'An error occurred while copying the preview.',
      });
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ChatGPT Table Converter
          </h5>

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

          {/* Dropdown and Buttons */}
          <div className="flex gap-2 mb-4">
            <select
              className="block p-2.5 w-1/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={conversionFormat}
              onChange={(e) => setConversionFormat(e.target.value)}
            >
              <option value="html">HTML</option>
              <option value="word-friendly">Word-Friendly</option>
            </select>
            <button
              onClick={convertToTable}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Convert
            </button>
            <button
              onClick={copyToClipboard}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Copy Preview
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
                dangerouslySetInnerHTML={{ __html: conversionFormat === 'html' ? outputHtml : outputWordFriendly }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
