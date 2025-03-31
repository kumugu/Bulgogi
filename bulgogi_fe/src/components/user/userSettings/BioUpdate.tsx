import type React from "react"
import { useState, useEffect } from "react"
import { getUserBio, updateUserBio } from "@/api/user/userApi"

const BioEditForm = () => {
  const [bio, setBio] = useState<string>("")
  const [editedBio, setEditedBio] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  // 컴포넌트 마운트 시 사용자 자기소개 정보 가져오기
  useEffect(() => {
    const fetchBio = async () => {
      setIsLoading(true)
      try {
        const response = await getUserBio()
        setBio(response.bio)
        setEditedBio(response.bio)
      } catch (error) {
        console.error("자기소개를 불러오는데 실패했습니다.", error)
        setMessage({ text: "자기소개를 불러오는데 실패했습니다.", type: "error" })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBio()
  }, [])

  // 자기소개 수정 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await updateUserBio({ bio: editedBio })
      setBio(response.bio)
      setMessage({ text: "자기소개가 성공적으로 변경되었습니다.", type: "success" })
      setIsEditing(false)
    } catch (error) {
      console.error("자기소개 변경에 실패했습니다.", error)
      setMessage({ text: "자기소개 변경에 실패했습니다.", type: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  // 편집 모드 토글
  const toggleEdit = () => {
    setIsEditing(!isEditing)
    setEditedBio(bio) // 편집 취소 시 원래 값으로 복원
    setMessage(null)
  }

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">자기소개</h2>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {!isEditing ? (
            <div className="mb-4">
              <p className="text-gray-700 whitespace-pre-wrap min-h-[60px]">
                {bio || "자기소개가 없습니다. 자기소개를 작성해보세요."}
              </p>
              <button
                onClick={toggleEdit}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                수정하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="자기소개를 입력하세요"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:bg-blue-300"
                >
                  {isLoading ? "저장 중..." : "저장하기"}
                </button>
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                >
                  취소
                </button>
              </div>
            </form>
          )}

          {message && (
            <div
              className={`mt-4 p-3 rounded ${
                message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BioEditForm

