# Bulgogi API 문서

## 목차
- [인증 (Authentication)](#인증-authentication)
- [사용자 관리 (User Management)](#사용자-관리-user-management)
- [공개 사용자 정보 (Public User Information)](#공개-사용자-정보-public-user-information)
- [블로그 (Blog)](#블로그-blog)
- [소셜 기능 (Social)](#소셜-기능-social)
- [결제 (Payment)](#결제-payment)

## 인증 (Authentication)

| 메소드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/auth/register` | 회원가입 | - |
| POST | `/api/auth/login` | 로그인 | - |
| POST | `/api/auth/refresh` | 토큰 갱신 | - |
| POST | `/api/auth/logout` | 로그아웃 | - |

## 사용자 관리 (User Management)

| 메소드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| GET | `/api/users/me` | 내 정보 조회 | - | 
| PATCH | `/api/users/me` | 내 정보 수정 | - |
| PATCH | `/api/users/me/password` | 비밀번호 변경 | - |
| DELETE | `/api/users/me` | 회원 탈퇴 | - |

## 공개 사용자 정보 (Public User Information)

| 메소드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| GET | `/api/users/{username}` | 특정 유저 정보 조회 | - |

## 블로그 (Blog)

### 블로그 홈

| 메소드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/blogs` | 블로그 홈 생성 | - |
| GET | `/api/blogs/me` | 내 블로그 홈 조회 | - |
| GET | `/api/blogs/{blog_slug}` | 특정 블로그 홈 조회 | - |
| PATCH | `/api/blogs/{blog_slug}` | 블로그 홈 수정 | - |
| DELETE | `/api/blogs/{blog_slug}` | 블로그 홈 삭제 | - |

### 게시글 관리 (Post Management)

| 메소드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/posts` | 게시글 작성 | - |
| GET | `/api/posts` | 게시글 목록 조회 | - |
| GET | `/api/posts/{post_slug}` | 특정 게시글 조회 | - |
| PATCH | `/api/posts/{post_slug}` | 게시글 수정 | - |
| DELETE | `/api/posts/{post_slug}` | 게시글 삭제 | - |

## 소셜 기능 (Social)

### 댓글 (Comment)

| 메소드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/posts/{post_slug}/comments` | 댓글 작성 | - |
| GET | `/api/posts/{post_slug}/comments` | 게시글의 댓글 조회 | - |
| PATCH | `/api/comments/{comment_id}` | 댓글 수정 | - |
| DELETE | `/api/comments/{comment_id}` | 댓글 삭제 | - |

### 좋아요 (Like)

| 메소드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/posts/{post_slug}/like` | 게시글 좋아요 | - |
| DELETE | `/api/posts/{post_slug}/like` | 게시글 좋아요 취소 | - |
| POST | `/api/comments/{comment_id}/like` | 댓글 좋아요 | - |
| DELETE | `/api/comments/{comment_id}/like` | 댓글 좋아요 취소 | - |

### 팔로우 (Follow)

| 메소드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/users/{user_id}/follow` | 사용자 팔로우 | - |
| DELETE | `/api/users/{user_id}/follow` | 사용자 언팔로우 | - |
| GET | `/api/users/me/following` | 팔로잉 목록 조회 | - |
| GET | `/api/users/me/followers` | 팔로워 목록 조회 | - |

### 다이렉트 메시지 (Direct Message)

| 메소드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/dms` | DM 전송 | - |
| GET | `/api/dms` | DM 목록 조회 | - |
| GET | `/api/dms/{user_id}` | 특정 유저와의 DM 조회 | - |
| DELETE | `/api/dms/{message_id}` | DM 삭제 | - |

### 알림 (Notification)

| 메소드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| GET | `/api/notifications` | 내 알림 목록 조회 | - |
| PATCH | `/api/notifications/{notification_id}` | 특정 알림 읽음 처리 | - |
| DELETE | `/api/notifications/{notification_id}` | 특정 알림 삭제 | - |

## 결제 (Payment)

### 구독 (Subscription)

| 메소드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/subscriptions` | 구독 신청 | - |
| GET | (엔드포인트 없음) | 내 구독 | - |
| PATCH | `/api/subscriptions` | 구독 플랜 변경 | - |
| DELETE | `/api/subscriptions` | 구독 취소 | - |

### 결제 관리 (Payments)

| 메소드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| POST | `/api/payments` | 결제 요청 | - |
| GET | `/api/payments/history` | 결제 내역 조회 | - |
| GET | `/api/payments/{payment_id}` | 결제 상세 조회 | - |
| POST | `/api/payments/{payment_id}/cancel` | 결제 취소 | - |
