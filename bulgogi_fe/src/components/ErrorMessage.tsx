import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500 transition-all duration-300">
      {message}
    </div>
  );
};

export default ErrorMessage;
