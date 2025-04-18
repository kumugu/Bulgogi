// 게시글 생성 요청 타입
export interface CreatePostRequest {
  title: string;
  content: string;
  topicId: number;             // 주제 ID
  folderCategoryId: number;    // 폴더 카테고리 ID
  tagIds: number[];            // 선택한 태그들의 ID
  imageUrls: string[];         // 첨부 이미지 URL 리스트
  isDraft?: boolean; 
}

// 게시글 응답 타입
export interface PostResponse {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;

  authorId: number;
  authorName: string;

  topicId: number;
  topicName: string;

  folderCategoryId: number;
  folderCategoryName: string;

  tags: {
    id: number;
    name: string;
  }[];

  images: string[];
  views: number;
  commentCount: number;
  published: boolean;
}
