import type React from "react"
import type { LoginFieldProps } from "@/types/user/authTypes"
import { AlertCircle, CheckCircle2 } from "lucide-react"

const LoginField: React.FC<LoginFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  autoComplete,
  disabled = false,
}) => {
  const hasError = touched && error
  const isValid = touched && !error && value

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1 block">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`block w-full rounded-lg border ${
            hasError ? "border-red-500 pr-10" : isValid ? "border-green-500 pr-10" : "border-neutral-200"
          } px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:ring-1 focus:ring-neutral-900 sm:text-sm`}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          required
        />
        {hasError && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        )}
        {isValid && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </div>
        )}
      </div>
      {hasError && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default LoginField

