import React, { useState, useCallback, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Tag, X, Save, Send } from "lucide-react";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(""); // 카테고리 상태 추가
  const [content, setContent] = useState("**Hello world!!!**");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 태그 추가 핸들러
  const handleAddTag = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && currentTag.trim() !== "") {
        e.preventDefault();
        if (!tags.includes(currentTag.trim())) {
          setTags([...tags, currentTag.trim()]);
        }
        setCurrentTag("");
      }
    },
    [currentTag, tags]
  );

  // 태그 제거 핸들러
  const handleRemoveTag = useCallback(
    (tagToRemove: string) => {
      setTags(tags.filter((tag) => tag !== tagToRemove));
    },
    [tags]
  );

  // 임시저장 핸들러
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Saved:", { title, category, content, tags });
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // 발행하기 핸들러
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Published:", { title, category, content, tags });
    } catch (error) {
      console.error("Publish failed:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        {/* 제목 입력 */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
          className="w-full text-4xl font-serif font-bold mb-8 p-2 border-none focus:outline-none focus:ring-0 placeholder:text-neutral-300"
        />

        {/* 카테고리 선택 */}
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

        {/* 태그 입력 */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <Tag className="h-5 w-5 text-neutral-400" />
          {tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-100 text-sm">
              {tag}
              <button onClick={() => handleRemoveTag(tag)} className="text-neutral-400 hover:text-neutral-600">
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Enter tags..."
            className="flex-grow p-2 border-none focus:outline-none focus:ring-0 text-sm placeholder:text-neutral-300"
          />
        </div>

        {/* 마크다운 에디터 */}
        <div className="prose max-w-none">
          {mounted && (
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || "")}
              preview="edit"
              height={500}
              className="w-full mb-8"
            />
          )}
        </div>

        {/* 버튼 그룹 */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-md text-neutral-600 hover:bg-neutral-50 transition-colors duration-200"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded-md text-white hover:bg-neutral-800 transition-colors duration-200"
          >
            <Send className="h-4 w-4" />
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
