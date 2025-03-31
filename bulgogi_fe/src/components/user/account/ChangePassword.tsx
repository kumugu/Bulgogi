import type React from "react"
import { useChangePassword } from "@/hooks/user/account/useChangePassword"
import { useState, useEffect } from "react"

const ChangePasswordForm = () => {
  const { changePassword, loading, error, message } = useChangePassword()
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // 비밀번호 변경 성공 시 입력란 초기화
  useEffect(() => {
    if (message && !loading && !error) {
      // 성공 메시지가 있고, 로딩 중이 아니며, 에러가 없을 때 폼 초기화
      resetForm()
    }
  }, [message, loading, error])

  // 폼 초기화 함수
  const resetForm = () => {
    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 비빌번호 확인이 일치하지 않습니다.")
      return
    }

    const passwordData = { oldPassword, newPassword }
    changePassword(passwordData)
    // 여기서 바로 초기화하지 않고, 성공 응답이 오면 useEffect에서 초기화
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">Change Password</h2>
      <div className="space-y-4">
        {/* 기존 비밀번호 입력 */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Current Password
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
            placeholder="Current Password"
          />
        </div>

        {/* 새로운 비밀번호 입력 */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block w-full rounded-lg border border-neutral-300 dark:border-neutral-600 px-4 py-3"
            placeholder="New Password"
          />
        </div>

        {/* 비밀번호 확인 입력 */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full rounded-lg border border-neutral-300 dark:border-neutral-600 px-4 py-3"
            placeholder="Confirm New Password"
          />
        </div>

        {/* 비밀번호 확인 오류 메시지 */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        {/* 업데이트 버튼 */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? "비밀번호 변경 중..." : "Change Password"}
        </button>
      </div>
    </form>
  )
}

export default ChangePasswordForm

