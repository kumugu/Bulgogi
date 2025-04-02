# 블로그 시스템 API 문서

## 목차
- [게시글 관련 API](#게시글-관련-api)
- [댓글 관련 API](#댓글-관련-api)
- [이미지 관련 API](#이미지-관련-api)
- [태그 관련 API](#태그-관련-api)
- [Topic(주제) 관련 API](#topic-주제-관련-api)
- [Folder Category 관련 API](#folder-category-관련-api)
- [조회수 최적화 관련 API](#조회수-최적화-관련-api)

## 게시글 관련 API

### 게시글 작성
- **엔드포인트**: `POST /posts`
- **기능**: 새로운 게시글 작성
- **요청 데이터**: 
  - `title` - 게시글 제목
  - `content` - 게시글 내용
  - `topicId` - 주제 ID
  - `folderCategoryId` - 폴더 카테고리 ID
  - `tagIds` - 태그 ID 리스트
  - `imageUrls` - 이미지 URL 리스트
- **인증**: JWT 인증 필요

### 게시글 수정
- **엔드포인트**: `PUT /posts/{postId}`
- **기능**: 기존 게시글 정보 수정
- **수정 가능 필드**: 
  - `title`
  - `content`
  - `topicId`
  - `folderCategoryId`
  - `tagIds`
- **권한**: 본인 게시글만 수정 가능

### 게시글 삭제
- **엔드포인트**: `DELETE /posts/{postId}`
- **기능**: 게시글 삭제
- **권한**: 본인 게시글만 삭제 가능
- **참고**: 연관된 댓글, 이미지도 함께 삭제됨

### 게시글 목록 조회
- **엔드포인트**: `GET /posts`
- **기능**: 게시글 목록 조회
- **필터링 옵션**:
  - `topicId` - 특정 주제별 필터링
  - `folderCategoryId` - 특정 폴더별 필터링
  - `tagIds` - 특정 태그별 필터링
  - `authorId` - 특정 작성자별 필터링
  - `sortBy` - 정렬 방식(최신순, 인기순)
- **특징**: 
  - `PostContent` 제외하고 조회(가벼운 데이터만 반환)
  - 페이지네이션 지원

### 게시글 상세 조회
- **엔드포인트**: `GET /posts/{postId}`
- **기능**: 게시글 상세 정보 조회
- **반환 데이터**:
  - `title` - 게시글 제목
  - `content` - 게시글 내용
  - `topicId` - 주제 ID
  - `folderCategoryId` - 폴더 카테고리 ID
  - `tagIds` - 태그 ID 리스트
  - `createdAt` - 작성 시간
  - `views` - 조회수
  - 기타 전체 정보 포함
- **참고**: Redis 활용하여 조회수 증가 처리

### 게시글 내용만 조회
- **엔드포인트**: `GET /posts/{postId}/content`
- **기능**: 게시글 본문만 조회
- **특징**: 이미 불러온 기본 데이터 제외한 내용만 반환

### 게시글 조회수 증가
- **엔드포인트**: `POST /posts/{postId}/view`
- **기능**: 게시글 조회수 증가
- **처리 방식**:
  - Redis에서 조회수 증가 (`INCR views:{postId}`)
  - 일정 주기마다 DB에 반영

## 댓글 관련 API

### 댓글 작성
- **엔드포인트**: `POST /posts/{postId}/comments`
- **기능**: 특정 게시글에 댓글 작성
- **인증**: JWT 기반 사용자 인증 필요

### 댓글 수정
- **엔드포인트**: `PUT /comments/{commentId}`
- **기능**: 댓글 내용 수정
- **권한**: 본인 댓글만 수정 가능

### 댓글 삭제
- **엔드포인트**: `DELETE /comments/{commentId}`
- **기능**: 댓글 삭제
- **권한**: 본인 댓글만 삭제 가능

### 댓글 목록 조회
- **엔드포인트**: `GET /posts/{postId}/comments`
- **기능**: 특정 게시글의 댓글 목록 조회
- **특징**: 페이지네이션 지원

## 이미지 관련 API

### 이미지 업로드
- **엔드포인트**: `POST /images/upload`
- **기능**: 이미지 업로드
- **처리 방식**: 
  - S3에 업로드 후 URL 및 메타데이터 저장
  - 저장되는 메타데이터: `size`, `format`

### 게시글 이미지 조회
- **엔드포인트**: `GET /posts/{postId}/images`
- **기능**: 특정 게시글에 첨부된 이미지 목록 반환

### 게시글 이미지 추가
- **엔드포인트**: `PUT /posts/{postId}/images`
- **기능**: 게시글에 이미지 추가
- **옵션**: 
  - `replace=true` - 기존 이미지 교체
  - `replace=false` - 기존 이미지 유지하며 추가

### 이미지 삭제
- **엔드포인트**: `DELETE /images/{imageId}`
- **기능**: 이미지 삭제
- **권한**: 본인 게시글의 이미지만 삭제 가능

## 태그 관련 API

### 태그 자동 완성
- **엔드포인트**: `GET /tags/suggestions?query=...`
- **기능**: 입력된 쿼리와 유사한 태그 추천
- **처리 방식**: `LIKE` 검색 활용

### 태그 목록 조회
- **엔드포인트**: `GET /tags`
- **기능**: 전체 태그 목록 조회

### 태그 등록
- **엔드포인트**: `POST /tags`
- **기능**: 새로운 태그 추가
- **권한**: 운영자만 가능 또는 사용자 추가 가능 여부에 따라 결정

## Topic (주제) 관련 API

### Topic 목록 조회
- **엔드포인트**: `GET /topics`
- **기능**: 미리 정의된 Topic 목록 반환

### Topic 생성
- **엔드포인트**: `POST /topics`
- **기능**: 새로운 Topic 추가
- **권한**: 운영자만 가능

### Topic 수정
- **엔드포인트**: `PUT /topics/{topicId}`
- **기능**: Topic 이름 변경
- **권한**: 관리자 권한 필요

### Topic 삭제
- **엔드포인트**: `DELETE /topics/{topicId}`
- **기능**: Topic 삭제
- **권한**: 본인 생성한 Topic만 삭제 가능

### Topic 별 게시글 조회
- **엔드포인트**: `GET /topics/{topicId}/posts`
- **기능**: 특정 Topic에 속하는 게시글 목록 반환

## Folder Category 관련 API

### 사용자 폴더 목록 조회
- **엔드포인트**: `GET /users/{userId}/folders`
- **기능**: 사용자가 생성한 폴더 카테고리 목록 조회

### 폴더 생성
- **엔드포인트**: `POST /folders`
- **기능**: 사용자 블로그 내에서 폴더 생성

### 폴더 수정
- **엔드포인트**: `PUT /folders/{folderId}`
- **기능**: 폴더 이름 변경

### 폴더 삭제
- **엔드포인트**: `DELETE /folders/{folderId}`
- **기능**: 폴더 삭제
- **권한**: 본인 폴더만 삭제 가능

### 폴더 별 게시글 조회
- **엔드포인트**: `GET /folders/{folderId}/posts`
- **기능**: 특정 폴더에 속하는 게시글 목록 반환

## 조회수 최적화 관련 API

### 조회수 증가
- **엔드포인트**: `POST /posts/{postId}/view`
- **기능**: 게시글 조회수 증가
- **처리 방식**: Redis에서 조회수 증가 (`INCR views:{postId}`)

### DB와 동기화
- **처리 방식**: 배치 프로세스로 일정 주기마다 DB 반영
- **작업**: `UPDATE posts SET views = views + <Redis 값>`

### 조회수 조회
- **엔드포인트**: `GET /posts/{postId}/views`
- **기능**: 현재 조회수 반환 (Redis에 저장된 값)
