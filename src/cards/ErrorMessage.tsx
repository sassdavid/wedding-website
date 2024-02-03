import React from 'react';

const ErrorMessage = ({ message }) => {
  const hasError = Boolean(message);
  return (
    <div
      className={`errorMessage ${hasError ? 'hasError' : ''}`}>
      {message || '⠀'} {/* Use a non-breaking space or similar character to maintain space */}
    </div>
  );
};

export default ErrorMessage;
