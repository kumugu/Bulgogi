import { api } from "@/api/axios";
import { CreatePostRequest, PostResponse } from "@/types/blog/postTypes";

export const createPost = async (postData: CreatePostRequest): Promise<PostResponse> => {
  const response = await api.post<{ data: PostResponse }>("/blog/posts", postData);
  return response.data.data;
};
