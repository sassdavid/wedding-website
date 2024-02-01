import React from 'react';

const ErrorMessage = ({ message }) => {
  const hasError = Boolean(message);
  return (
    <div
      style={{
        minHeight: '20px',
        marginTop: '0.5em',
        marginBottom: '0.5em',
        color: hasError ? '#ff6b6b' : 'transparent',
        visibility: 'visible',
        opacity: 1,
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.8em',
        fontFamily: 'inherit',
        fontWeight: 'normal',
      }}>
      {message || '⠀'} {/* Use a non-breaking space or similar character to maintain space */}
    </div>
  );
};

export default ErrorMessage;
