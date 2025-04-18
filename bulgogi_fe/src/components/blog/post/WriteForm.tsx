import { useState } from "react";
import { Save, Send } from "lucide-react";
import MarkdownEditor from "./MarkdownEditor";
import TagInput from "./TagInput";
import { useCreatePost } from "@/hooks/blog/useCreatePost";

// 카테고리 문자열 → topicId로 매핑 (임시 매핑 예시)
const topicMap: Record<string, number> = {
  tech: 1,
  lifestyle: 2,
  health: 3,
  finance: 4,
};

const WriteForm = () => {
  const { mutate: createPost } = useCreatePost();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isPublishMode, setIsPublishMode] = useState(false); // true = 발행, false = 저장

  const topicId = topicMap[category] ?? 1; // 기본값 1
  const tagIds = [1, 2]; // 임시값
  const folderCategoryId = 1; // 임시값

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setTags([]);
    setContent("");
  };

  const handleOpenConfirm = (isPublishing: boolean) => {
    setIsPublishMode(isPublishing);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    const isDraft = !isPublishMode;
    const requestData = {
      title,
      content,
      topicId,
      folderCategoryId,
      tagIds,
      imageUrls: [],
      isDraft,
    };

    setIsLoading(true);

    createPost(requestData, {
      onSuccess: () => {
        console.log(isDraft ? "임시 저장 완료" : "게시 완료");
        resetForm();
      },
      onError: (error) => {
        console.error("요청 실패", error);
      },
      onSettled: () => {
        setIsLoading(false);
        setShowConfirmModal(false);
      },
    });
  };

  return (
    <>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title..."
        className="w-full text-4xl font-serif font-bold mb-8 p-2 border-none focus:outline-none focus:ring-0 placeholder:text-neutral-300"
      />

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">카테고리 선택</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-md bg-neutral-100 text-sm focus:outline-none"
        >
          <option value="">카테고리를 선택하세요</option>
          <option value="tech">기술</option>
          <option value="lifestyle">라이프스타일</option>
          <option value="health">건강</option>
          <option value="finance">금융</option>
        </select>
      </div>

      <TagInput tags={tags} setTags={setTags} />
      <MarkdownEditor content={content} setContent={setContent} />

      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={() => handleOpenConfirm(false)}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-md text-neutral-600 hover:bg-neutral-50"
        >
          <Save className="h-4 w-4" />
          {isLoading && !isPublishMode ? "Saving..." : "Save Draft"}
        </button>

        <button
          onClick={() => handleOpenConfirm(true)}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded-md text-white hover:bg-neutral-800"
        >
          <Send className="h-4 w-4" />
          {isLoading && isPublishMode ? "Publishing..." : "Publish"}
        </button>
      </div>

      {/* 확인 모달 */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4 text-center">
              {isPublishMode
                ? "게시글을 발행하시겠습니까?"
                : "임시 저장하시겠습니까?"}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border rounded-md"
              >
                취소
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WriteForm;
