import { useState } from "react";
import { useAdminUpdateUser } from "@/features/user/admin/useAdminUpdateUser";
import { AdminUpdateUserRequest } from "@/types/user/adminTypes";

const AdminUserUpdateForm = () => {
  const [targetId, setTargetId] = useState<number | "">("");
  const [formData, setFormData] = useState<AdminUpdateUserRequest>({
    username: "",
    bio: "",
    profileImage: "",
  });

  const { adminUpdateUser, loading, error, message } = useAdminUpdateUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetId) {
      alert("수정할 사용자 ID를 입력하세요.");
      return;
    }

    await adminUpdateUser(Number(targetId), formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">사용자 정보 수정</h2>

      <input
        type="number"
        value={targetId}
        onChange={(e) => setTargetId(e.target.value ? Number(e.target.value) : "")}
        placeholder="사용자 ID 입력"
        className="w-full p-2 mb-2 border rounded"
      />

      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="새로운 사용자명"
        className="w-full p-2 mb-2 border rounded"
      />

      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="새로운 자기소개"
        className="w-full p-2 mb-2 border rounded"
      />

      <input
        type="text"
        name="profileImage"
        value={formData.profileImage}
        onChange={handleChange}
        placeholder="프로필 이미지 URL"
        className="w-full p-2 mb-2 border rounded"
      />

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full p-2 text-white rounded ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {loading ? "수정 중..." : "수정하기"}
      </button>
    </div>
  );
};

export default AdminUserUpdateForm;
