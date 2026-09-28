import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Chargement...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12" role="status" aria-live="polite">
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-accent rounded-full animate-spin`}></div>
      {text && <p className="mt-4 text-text-muted">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;