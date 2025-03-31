import { useState } from "react";
import { MyProfile, UpdatedMyBioRequest } from "@/types/user/userTypes";
import { updateMyBioService } from "@/service/user/userService";

export const useUpdateMyBio = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [updatedMyBio, setUpdatedMyBio] = useState<MyProfile | null>(null);

    const updateMyBio = async (updateData: UpdatedMyBioRequest) => {
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const updatedMyBio = await updateMyBioService(updateData);
            setUpdatedMyBio(updatedMyBio);
            setMessage("자기소개가 성공적으로 수정되었습니다.");
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류 발생";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { updateMyBio, loading, error, message, updatedMyBio };
};