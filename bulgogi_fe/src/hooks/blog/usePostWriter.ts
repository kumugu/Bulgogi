// import { useState } from "react";
// import { creatPost, publishPost } from "@/api/blog/postApi";
// import type { PostRequest } from "@/types/blog/postTypes";

// export function usePostWriter() {
//     const [isSaving, setIsSaving] = useState(false);
//     const [isPublishing, setIsPublishing] = useState(false);

//     const savePost = async (postData: PostRequest): Promise<number | null> => {
//         try {
//             setIsSaving(true);
//             const result = await creatPost(postData);
//             return result.data;
//         } catch (error) {
//             console.error("게시글 저장 실패:", error);
//             return null;
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const publish = async (postId: number): Promise<boolean> => {
//         try {
//             setIsPublishing(true);
//             await publishPost(postId);
//             return true;
//           } catch (error) {
//             console.error("게시글 발행 실패:", error);
//             return false;
//           } finally {
//             setIsPublishing(false);
//           }
//         };
      
//         return {
//           isSaving,
//           isPublishing,
//           savePost,
//           publish,
//         };

// }
      