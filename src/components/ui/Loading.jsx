import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Chargement...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-accent rounded-full animate-spin`}></div>
      {text && <p className="mt-4 text-text-muted">{text}</p>}
    </div>
  );
};

const LoadingOverlay = ({ text = 'Chargement...' }) => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-accent rounded-full animate-spin"></div>
        <p className="mt-4 text-primary font-medium">{text}</p>
      </div>
    </div>
  );
};

const LoadingCard = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

export { LoadingSpinner, LoadingOverlay, LoadingCard };
export default LoadingSpinner;