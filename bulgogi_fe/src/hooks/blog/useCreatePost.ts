import { useMutation } from "@tanstack/react-query";
import { CreatePostRequest } from "@/types/blog/postTypes";
import { submitPost } from "@/service/blog/postService";

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (postData: CreatePostRequest) => submitPost(postData),
  });
};
