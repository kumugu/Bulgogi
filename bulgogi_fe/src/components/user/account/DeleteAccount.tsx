import { useDeleteAccount } from "@/hooks/user/account/useDeleteAccount"
import type React from "react"
import { useState } from "react"
import { FaLock as Lock } from "react-icons/fa"
import { IoWarningOutline as Warning } from "react-icons/io5"

const DeleteAccountForm = () => {
  const { deleteAccount, loading, error, message } = useDeleteAccount()
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!confirmPassword) {
      alert("비밀번호가 입력되지 않았습니다. 다시 입력해 주세요.")
      return
    }

    // 모달 표시
    setShowModal(true)
  }

  // 실제 계정 삭제 처리
  const handleConfirmDelete = () => {
    deleteAccount({ confirmPassword })
    setShowModal(false) // 모달 닫기
  }

  // 모달 닫기
  const handleCancelDelete = () => {
    setShowModal(false)
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
        <Lock className="h-5 w-5 mr-2" />
        Delete Account
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Once you delete your account, there is no going back. Please be certain.
      </p>

      {error && <div className="mt-3 p-2 bg-red-100 text-red-600 rounded">{error}</div>}

      {message && <div className="mt-3 p-2 bg-green-100 text-green-600 rounded">{message}</div>}

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Confirm your password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-red-600 text-white 
                    rounded-lg text-sm font-medium hover:bg-red-700
                    transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Processing..." : "Delete Account"}
        </button>
      </form>

      {/* 확인 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg max-w-md w-full">
            <div className="flex items-center mb-4 text-red-600">
              <Warning className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-bold">계정 삭제 확인</h3>
            </div>

            <div className="mb-6">
              <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없으며 모든 데이터가 영구적으로 삭제됩니다.
              </p>
              <ul className="list-disc pl-5 text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                <li>모든 개인 정보가 삭제됩니다</li>
                <li>작성한 모든 게시물이 삭제됩니다</li>
                <li>계정 복구가 불가능합니다</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm"
              >
                취소
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                disabled={loading}
              >
                {loading ? "삭제 중..." : "계정 삭제 확인"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteAccountForm