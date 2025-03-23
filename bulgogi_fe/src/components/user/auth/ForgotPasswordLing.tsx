import React from "react";
import { Link } from "react-router-dom";

const ForgotPasswordLink = () => {
  return (
    <div className="text-sm text-center">
      <Link to="/forgot-password" className="text-neutral-600 hover:text-neutral-900">
        비밀번호를 잊으셨나요?
      </Link>
    </div>
  );
};

export default ForgotPasswordLink;