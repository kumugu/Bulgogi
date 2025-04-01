import type React from "react"
import { CheckCircle2 } from "lucide-react"

interface RegisterFormSuccessProps {
  message: string
}

const RegisterFormSuccess: React.FC<RegisterFormSuccessProps> = ({ message }) => {
  return (
    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-start">
      <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
      <span className="text-sm">{message}</span>
    </div>
  )
}

export default RegisterFormSuccess

