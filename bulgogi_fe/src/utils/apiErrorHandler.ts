const handleApiError = (error: any): never => {
    if (error.response) {
        const message = error.response.data?.message || "서버 처리 중 오류가 발생했습니다.";
        throw new Error(message);
    }
    throw new Error("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
};