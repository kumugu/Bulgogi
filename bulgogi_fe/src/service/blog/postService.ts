import { createPost } from "@/api/blog/postApi";
import { CreatePostRequest } from "@/types/blog/postTypes";

export const submitPost = async (form: CreatePostRequest) => {
  try {
    const newPost = await createPost(form);
    return newPost;
  } catch (error) {
    console.error("게시글 작성 실패", error);
    throw error;
  }
};
