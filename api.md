# Bulgogi API Documentation

**Postman API 문서**: https://documenter.getpostman.com/view/40317640/2sAYdmn8WY

## Table of Contents
- [인증 (Authentication)](#인증-authentication)
- [사용자 관리 (User Management)](#사용자-관리-user-management)
- [공개 사용자 정보 (Public User Information)](#공개-사용자-정보-public-user-information)
- [관리자 권한 (Admin Controls)](#관리자-권한-admin-controls)
- [블로그 게시글 (Blog Posts)](#블로그-게시글-blog-posts)
- [게시글 콘텐츠 (Post Content)](#게시글-콘텐츠-post-content)
- [게시글 이미지 (Post Images)](#게시글-이미지-post-images)
- [주제 (Topics)](#주제-topics)
- [태그 (Tags)](#태그-tags)
- [댓글 (Comments)](#댓글-comments)
- [폴더/카테고리 (Folders/Categories)](#폴더카테고리-folderscategories)

## 인증 (Authentication)

| 메서드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/users/register` | 사용자 등록 | 이메일, 비밀번호, 사용자명, 프로필 이미지, 소개 글 포함 |
| POST | `/api/users/login` | 사용자 로그인 | 이메일, 비밀번호 |
| POST | `/api/users/refresh-token` | 토큰 갱신 | 없음 (Authorization 헤더에 Bearer 토큰 포함) |
| POST | `/api/users/logout` | 로그아웃 | 없음 (Authorization 헤더에 Bearer 토큰 포함) |

## 사용자 관리 (User Management)

| 메서드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| GET | `/api/users/my-info` | 내 프로필 조회 | 없음 | 
| GET | `/api/users/my-info/bio` | 내 소개 글 조회 | 없음 |
| PUT | `/api/users/my-info/bio` | 내 소개 글 수정 | 소개 글 내용 |
| GET | `/api/users/profile-image` | 프로필 이미지 조회 | 없음 |
| PUT | `/api/users/profile-image` | 프로필 이미지 수정 | 파일 첨부 |
| DELETE | `/api/users/profile-image` | 프로필 이미지 삭제 | 없음 |
| PUT | `/api/users/change-password` | 비밀번호 변경 | 기존 비밀번호, 새 비밀번호 |
| DELETE | `/api/users/delete-my-account` | 내 계정 삭제 | 없음 |

## 공개 사용자 정보 (Public User Information)

| 메서드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| GET | `/api/users/email/{email}` | 이메일로 사용자 조회 | 없음 |
| GET | `/api/users/username/{username}` | 사용자명으로 사용자 조회 | 없음 |
| GET | `/api/users/info/id/{id}` | ID로 사용자 조회 | 없음 |

## 관리자 권한 (Admin Controls)

| 메서드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| PUT | `/api/admin/users/{userId}/update` | 사용자 정보 수정 | 사용자명, 소개 글, 프로필 이미지, 삭제 여부 포함 |

## 블로그 게시글 (Blog Posts)

| 메서드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/blog/posts` | 게시글 작성 | 게시글 데이터 |
| PUT | `/api/blog/posts/{postId}` | 게시글 수정 | 게시글 데이터 |
| DELETE | `/api/blog/posts/{postId}` | 게시글 삭제 | 없음 |
| GET | `/api/blog/posts/{postId}` | 게시글 조회 | 없음 |
| GET | `/api/blog/posts/{postId}/content` | 게시글 콘텐츠 조회 | 없음 |
| GET | `/api/blog/posts` | 게시글 목록 조회 | 필터 및 페이지네이션 쿼리 |
| PUT | `/api/blog/posts/{postId}/publish` | 게시글 발행 상태 수정 | 발행 여부 |
| GET | `/api/blog/posts/{postId}/views` | 게시글 조회수 조회 | 없음 |
| GET | `/api/blog/posts/user/{userId}` | 사용자별 게시글 조회 | 없음 |
| POST | `/api/blog/posts/{postId}/images` | 게시글 이미지 추가 | 이미지 파일 첨부 |

## 게시글 콘텐츠 (Post Content)

| 메서드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| GET | `/api/blog/posts/{postId}/post-content` | 게시글 콘텐츠 조회 | 없음 |
| PUT | `/api/blog/posts/{postId}/post-content` | 게시글 콘텐츠 수정 | 콘텐츠 데이터 |
| POST | `/api/blog/posts/{postId}/post-content` | 게시글 콘텐츠 저장 | 콘텐츠 데이터 |
| DELETE | `/api/blog/posts/{postId}/post-content` | 게시글 콘텐츠 삭제 | 없음 |

## 게시글 이미지 (Post Images)

| 메서드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/posts/{postId}/images-upload` | 게시글 이미지 업로드 | 이미지 파일 첨부 |
| GET | `/api/posts/{postId}/images-upload` | 게시글 이미지 조회 | 없음 |
| GET | `/api/posts/{postId}/images-upload/check` | 이미지 URL 존재 여부 확인 | 쿼리 파라미터 |
| GET | `/api/posts/{postId}/images-upload/url` | URL로 이미지 조회 | 쿼리 파라미터 |
| DELETE | `/api/posts/{postId}/images-upload/{imageId}` | 특정 이미지 삭제 | 없음 |
| DELETE | `/api/posts/{postId}/images-upload` | 모든 이미지 삭제 | 없음 |

## 주제 (Topics)

| 메서드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/blog/topics` | 주제 생성 | 주제 데이터 |
| PUT | `/api/blog/topics/{topicId}` | 주제 수정 | 주제 데이터 |
| DELETE | `/api/blog/topics/{topicId}` | 주제 삭제 | 없음 |
| GET | `/api/blog/topics` | 모든 주제 조회 | 없음 |
| GET | `/api/blog/topics/active` | 활성화된 주제 조회 | 없음 |
| GET | `/api/blog/topics/{topicId}/posts` | 주제별 게시글 조회 | 없음 |
| GET | `/api/blog/topics/popular` | 인기 주제 조회 | 없음 |
| GET | `/api/blog/topics/{topicId}` | 주제 상세 조회 | 없음 |

## 태그 (Tags)

| 메서드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/blog/tags/tags` | 태그 생성 | 태그 데이터 |
| POST | `/api/blog/tags/batch` | 배치 태그 생성/조회 | 태그 이름 배열 |
| GET | `/api/blog/tags/suggestions` | 태그 추천 | 부분 이름 쿼리 |
| GET | `/api/blog/tags` | 모든 태그 조회 | 페이지네이션 쿼리 |
| GET | `/api/blog/tags/popular` | 인기 태그 조회 | 없음 |
| GET | `/api/blog/tags/name/{name}` | 이름으로 태그 조회 | 없음 |
| GET | `/api/blog/tags/{id}` | ID로 태그 조회 | 없음 |

## 댓글 (Comments)

| 메서드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/blog/comments/posts/{postId}` | 게시글에 댓글 추가 | 댓글 데이터 |
| PUT | `/api/blog/comments/{commentId}` | 댓글 수정 | 댓글 데이터 |
| DELETE | `/api/blog/comments/{commentId}` | 댓글 삭제 | 없음 |
| GET | `/api/blog/comments/posts/{postId}` | 게시글 댓글 조회 | 없음 |
| GET | `/api/blog/comments/users/{userId}` | 사용자 댓글 조회 | 없음 |
| GET | `/api/blog/comments/{commentId}` | 특정 댓글 조회 | 없음 |

## 폴더/카테고리 (Folders/Categories)

| 메서드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/blog/folders` | 루트 폴더 생성 | 폴더 데이터 |
| POST | `/api/blog/folders/{parentId}/subfolders` | 하위 폴더 생성 | 폴더 데이터 |
| PUT | `/api/blog/folders/{folderId}` | 폴더 이름 수정 | 이름 데이터 |
| DELETE | `/api/blog/folders/{folderId}` | 폴더 삭제 | 없음 |
| GET | `/api/blog/folders/{folderId}` | 단일 폴더 조회 | 없음 |
| GET | `/api/blog/folders/all` | 모든 사용자 폴더 조회 | 없음 |
| GET | `/api/blog/folders/root` | 루트 폴더 조회 | 없음 |
| GET | `/api/blog/folders/{parentId}/subfolders` | 하위 폴더 조회 | 없음 |
| PUT | `/api/blog/folders/order` | 폴더 순서 변경 | 폴더 ID 및 위치 |
| GET | `/api/blog/folders/hierarchy` | 폴더 계층 조회 | 없음 |
| PUT | `/api/blog/folders/{folderId}/move/{newParentId}` | 폴더 이동 | 없음 |
