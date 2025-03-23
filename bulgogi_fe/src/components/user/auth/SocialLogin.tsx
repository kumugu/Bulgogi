import React from "react";

const SocialLogin: React.FC = () => {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 transition-colors duration-200"
      >
        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
            fill="#EA4335"
          />
          <path
            d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
            fill="#4285F4"
          />
          <path
            d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.27498 6.60986C0.46498 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46498 15.7699 1.27498 17.3899L5.26498 14.2949Z"
            fill="#FBBC05"
          />
          <path
            d="M12.0004 24C15.2354 24 17.9504 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.87043 19.245 6.21543 17.135 5.27045 14.29L1.28045 17.385C3.25545 21.31 7.31043 24 12.0004 24Z"
            fill="#34A853"
          />
        </svg>
        Google로 계속하기
      </button>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 transition-colors duration-200"
      >
        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.537 12c0 1.154-.945 2.1-2.099 2.1-1.154 0-2.1-.945-2.1-2.1 0-1.154.945-2.1 2.1-2.1 1.153 0 2.099.945 2.099 2.1zm4.2 0c0 1.154-.945 2.1-2.1 2.1-1.154 0-2.1-.945-2.1-2.1 0-1.154.945-2.1 2.1-2.1 1.154 0 2.1.945 2.1 2.1zm4.2 0c0 1.154-.945 2.1-2.1 2.1-1.154 0-2.1-.945-2.1-2.1 0-1.154.945-2.1 2.1-2.1 1.154 0 2.1.945 2.1 2.1z" />
        </svg>
        카카오로 계속하기
      </button>
    </div>
  );
};

export default SocialLogin;
