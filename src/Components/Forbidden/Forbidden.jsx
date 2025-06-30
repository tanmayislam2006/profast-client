import React from 'react';
import { useNavigate } from 'react-router';

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center max-w-md w-full">
        <div className="text-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
        <p className="text-gray-500 text-center mb-6">
          Sorry, you don&apos;t have permission to access this page.<br />
          Please contact your administrator if you believe this is a mistake.
        </p>
        <button
          className="btn btn-primary w-full"
          onClick={() => navigate('/')}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Forbidden;