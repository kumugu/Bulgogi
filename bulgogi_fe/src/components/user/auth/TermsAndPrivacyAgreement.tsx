import React from "react";
import { Link } from "react-router-dom";

const TermsAndPrivacyAgreement: React.FC = () => {
  return (
    <p className="text-xs text-center text-neutral-500">
      계속 진행하면 Bulgogi의{" "}
      <Link to="/terms" className="text-neutral-900 hover:underline">
        서비스 약관
      </Link>
      과{" "}
      <Link to="/privacy" className="text-neutral-900 hover:underline">
        개인정보 처리방침
      </Link>
      에 동의하는 것으로 간주됩니다.
    </p>
  );
};

export default TermsAndPrivacyAgreement;