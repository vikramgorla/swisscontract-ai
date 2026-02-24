'use client';

import React, { useCallback, useState, useEffect, useRef } from 'react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isAnalysing: boolean;
}

const PROGRESS_STEPS = [
  { pct: 8,  label: 'Uploading document…' },
  { pct: 20, label: 'Extracting text…' },
  { pct: 35, label: 'Reading contract…' },
  { pct: 52, label: 'Identifying clauses…' },
  { pct: 67, label: 'Checking for red flags…' },
  { pct: 80, label: 'Applying Swiss law context…' },
  { pct: 90, label: 'Clearing document from memory…' },
  { pct: 95, label: 'Finalising analysis…' },
];

export default function UploadZone({ onFileSelect, isAnalysing }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const stepRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isAnalysing) {
      stepRef.current = 0;
      setProgress(0);
      setProgressLabel(PROGRESS_STEPS[0].label);
      scheduleNext();
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
      // Jump to 100% briefly on completion
      setProgress(100);
      setProgressLabel('Done!');
      setTimeout(() => { setProgress(0); setProgressLabel(''); }, 600);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isAnalysing]);

  const scheduleNext = () => {
    const step = stepRef.current;
    if (step >= PROGRESS_STEPS.length) return;
    // Spread steps across ~25s (typical analysis time)
    const delays = [300, 1500, 2500, 4000, 4500, 3500, 2000, 2000];
    timerRef.current = setTimeout(() => {
      setProgress(PROGRESS_STEPS[step].pct);
      setProgressLabel(PROGRESS_STEPS[step].label);
      stepRef.current = step + 1;
      scheduleNext();
    }, delays[step] ?? 2000);
  };

  const validateAndSetFile = (file: File) => {
    setError(null);
    
    const allowedTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    const allowedExtensions = ['.pdf', '.txt', '.docx', '.doc'];
    const fileName = file.name.toLowerCase();
    const hasAllowedExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!allowedTypes.includes(file.type) && !hasAllowedExtension) {
      setError('Please upload a PDF, Word document (.docx), or text (.txt) file.');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large. Maximum size is 5MB.');
      return;
    }
    
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndSetFile(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isAnalysing && document.getElementById('file-input')?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200
          ${isDragging 
            ? 'border-red-500 bg-red-50' 
            : selectedFile 
              ? 'border-green-400 bg-green-50' 
              : 'border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50'
          }
          ${isAnalysing ? 'cursor-not-allowed opacity-75' : ''}
        `}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf,.docx,.doc,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,text/plain"
          onChange={handleFileInput}
          className="hidden"
          disabled={isAnalysing}
        />

        {isAnalysing ? (
          <div className="flex flex-col items-center gap-4 w-full px-2">
            <div className="w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
            <div className="w-full">
              <div className="flex justify-between items-center mb-1.5">
                <p className="text-sm font-medium text-gray-700">{progressLabel}</p>
                <p className="text-sm font-semibold text-red-600">{progress}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-red-600 h-2.5 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-gray-400">This usually takes 10–20 seconds</p>
          </div>
        ) : selectedFile ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)} · Click to change file</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Drop your contract here</p>
              <p className="text-sm text-gray-500 mt-1">or <span className="text-red-600 font-medium">click to browse</span></p>
              <p className="text-xs text-gray-400 mt-2">PDF, Word (.docx) or .txt · Max 5MB · Max 20 pages</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
