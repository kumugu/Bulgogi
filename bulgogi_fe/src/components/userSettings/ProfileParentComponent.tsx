import React, { useState, useEffect } from "react";
import { api } from "@/api/axios"; // axios 인스턴스 import
import ProfileSection from "./ProfileSection";  // ProfileSection import

const ProfileParentComponent = () => {
  const [bio, setBio] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 사용자 프로필 정보 가져오기
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users/my-info");
      setBio(response.data.bio);
      setLoading(false);
    } catch (err) {
      setError("프로필 정보를 가져오는 데 실패했습니다.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 프로필 수정 함수
  const handleProfileSave = async () => {
    setLoading(true);
    try {
      await api.put("/users/my-info", { bio });
      setLoading(false);
    } catch (err) {
      setError("프로필 저장 실패");
      setLoading(false);
    }
  };

  return (
    <ProfileSection
      bio={bio}
      onBioChange={(e) => setBio(e.target.value)}
      onSubmit={handleProfileSave}
      loading={loading}
      error={error}
    />
  );
};

export default ProfileParentComponent;
