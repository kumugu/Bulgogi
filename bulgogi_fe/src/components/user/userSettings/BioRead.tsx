import { useState, useEffect } from "react"
import { getUserBio } from "@/api/user/userApi"

const UserBio = () => {
  const [bio, setBio] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await getUserBio()
        setBio(response.bio)
      } catch (err) {
        console.error("자기소개를 불러오는데 실패했습니다.", err)
        setError("자기소개를 불러올 수 없습니다.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBio()
  }, [])

  if (isLoading) {
    return <div className="text-sm text-neutral-500">자기소개 불러오는 중...</div>
  }

  if (error) {
    return <div className="text-sm text-red-500">{error}</div> 
  }

  if (!bio) {
    return <div className="text-sm text-neutral-500 italic">자기소개가 없습니다.</div>
  }

  return (
    <div className="mt-2">
      <p className="text-sm text-neutral-600 whitespace-pre-wrap">{bio}</p>
    </div>
  )
}

export default UserBio;
