# Bulgogi 블로그 플랫폼 데이터베이스 설계

## 테이블 설계

### 1. `users` (사용자 정보)

**설명**: 블로그 서비스의 기본 사용자 정보를 저장하는 테이블

**테이블 정의**:

```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- 사용자 고유 식별자
    email VARCHAR(255) UNIQUE NOT NULL, -- 로그인에 사용되는 이메일 (고유값)
    password_hash VARCHAR(255) NOT NULL, -- 해시된 비밀번호
    username VARCHAR(50) UNIQUE NOT NULL, -- 블로그 주소에 사용될 고유 사용자명
    profile_image TEXT, -- 프로필 사진 URL
    bio TEXT, -- 자기소개
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 계정 생성 시간
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- 계정 수정 시간
);
```

**인덱스 추가**:

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

### 2. `blog_homes` (블로그 홈)

**설명**: 각 사용자의 블로그 정보를 저장하는 테이블

**테이블 정의**:

```sql
CREATE TABLE blog_homes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- 블로그 홈 고유 식별자
    user_id BIGINT UNIQUE NOT NULL, -- 블로그 소유자 (사용자 ID)
    url_slug VARCHAR(100) UNIQUE NOT NULL, -- SEO 최적화된 URL 경로
    title VARCHAR(255) NOT NULL, -- 블로그 제목
    description TEXT, -- 블로그 설명
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 블로그 생성 시간
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 블로그 수정 시간
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- 외래 키, 사용자 ID와 연관됨
);
```

**인덱스 추가**:

```sql
CREATE INDEX idx_blog_homes_user_id ON blog_homes(user_id);
CREATE INDEX idx_blog_homes_url_slug ON blog_homes(url_slug);
```

### 3. `posts` (게시글)

**설명**: 블로그 게시글을 저장하는 테이블

**테이블 정의**:

```sql
CREATE TABLE posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- 게시글 고유 식별자
    user_id BIGINT NOT NULL, -- 작성자 (사용자 ID)
    blog_home_id BIGINT NOT NULL, -- 블로그 홈 ID
    category_id BIGINT, -- 카테고리 ID
    title VARCHAR(255) NOT NULL, -- 게시글 제목
    slug VARCHAR(255) UNIQUE NOT NULL, -- SEO 최적화된 URL 경로
    content TEXT NOT NULL, -- 게시글 내용
    excerpt TEXT, -- 게시글 요약
    featured_image TEXT, -- 대표 이미지
    reading_time INT, -- 예상 읽기 시간(분)
    view_count INT DEFAULT 0, -- 조회 수
    is_premium BOOLEAN DEFAULT FALSE, -- 프리미엄 전용 콘텐츠 여부
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 게시글 생성 시간
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 게시글 수정 시간
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- 외래 키, 사용자 ID와 연관됨
    FOREIGN KEY (blog_home_id) REFERENCES blog_homes(id) ON DELETE CASCADE, -- 외래 키, 블로그 홈 ID와 연관됨
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL -- 외래 키, 카테고리 ID와 연관됨
);
```

**인덱스 추가**:

```sql
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_blog_home_id ON posts(blog_home_id);
CREATE INDEX idx_posts_category_id ON posts(category_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);
```

### 4. `tags` (태그 테이블)

**설명**: 블로그 게시글에 사용되는 태그를 저장하는 테이블

**테이블 정의**:

```sql
CREATE TABLE tags (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- 태그 고유 식별자
    name VARCHAR(100) UNIQUE NOT NULL -- 태그 이름
);
```

### 5. `post_tags` (게시글-태그 매핑 테이블)

**설명**: 게시글과 태그 간의 매핑 관계를 저장하는 테이블

**테이블 정의**:

```sql
CREATE TABLE post_tags (
    post_id BIGINT NOT NULL, -- 게시글 ID
    tag_id BIGINT NOT NULL, -- 태그 ID
    PRIMARY KEY (post_id, tag_id), -- 복합 기본 키
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE, -- 외래 키, 게시글 ID와 연관됨
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE -- 외래 키, 태그 ID와 연관됨
);
```

### 6. `comments` (댓글)

**설명**: 게시글의 댓글을 저장하는 테이블

**테이블 정의**:

```sql
CREATE TABLE comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- 댓글 고유 식별자
    post_id BIGINT NOT NULL, -- 게시글 ID
    user_id BIGINT NOT NULL, -- 작성자 (사용자 ID)
    parent_id BIGINT, -- 부모 댓글 ID (대댓글 구조 지원)
    content TEXT NOT NULL, -- 댓글 내용
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 댓글 생성 시간
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 댓글 수정 시간
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE, -- 외래 키, 게시글 ID와 연관됨
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- 외래 키, 사용자 ID와 연관됨
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE SET NULL -- 외래 키, 부모 댓글 ID와 연관됨
);
```

**인덱스 추가**:

```sql
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
```

### 7. `follows` (팔로우 관계)

**설명**: 유저 간 팔로우 관계를 저장하는 테이블

**테이블 정의**:

```sql
CREATE TABLE follows (
    follower_id BIGINT NOT NULL, -- 팔로우 한 사용자 ID
    following_id BIGINT NOT NULL, -- 팔로우 당한 사용자 ID
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 팔로우 생성 시간
    PRIMARY KEY (follower_id, following_id), -- 복합 기본 키
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE, -- 외래 키, 팔로우 한 사용자 ID와 연관됨
    FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE -- 외래 키, 팔로우 당한 사용자 ID와 연관됨
);
```

**인덱스 추가**:

```sql
CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);
```

### 8. `likes` (게시글 좋아요)

**설명**: 게시글에 대한 좋아요를 저장하는 테이블

**테이블 정의**:

```sql
CREATE TABLE likes (
    user_id BIGINT NOT NULL, -- 좋아요 한 사용자 ID
    post_id BIGINT NOT NULL, -- 좋아요 대상 게시글 ID
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 좋아요 생성 시간
    PRIMARY KEY (user_id, post_id), -- 복합 기본 키
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- 외래 키, 사용자 ID와 연관됨
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE -- 외래 키, 게시글 ID와 연관됨
);
```

**인덱스 추가**:

```sql
CREATE INDEX idx_likes_post_id ON likes(post_id);
```

### 9. `categories` (카테고리)

**설명**: 블로그 게시글의 카테고리를 저장하는 테이블

**테이블 정의**:

```sql
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- 카테고리 고유 식별자
    user_id BIGINT NOT NULL, -- 카테고리 생성자 (사용자 ID)
    name VARCHAR(100) NOT NULL, -- 카테고리 이름
    description TEXT, -- 카테고리 설명
    UNIQUE KEY (user_id, name), -- 사용자별 고유 카테고리 이름
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- 외래 키, 사용자 ID와 연관됨
);
```

### 10. `notifications` (알림 시스템)

**설명**: 유저의 활동 알림을 저장하는 테이블. 알림을 받는 사용자와 알림을 생성한 사용자, 알림 유형 및 관련된 콘텐츠 정보를 저장합니다.

**테이블 정의**:

```sql
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- 알림 고유 식별자
    user_id BIGINT NOT NULL, -- 알림을 받는 사용자 ID
    sender_id BIGINT, -- 알림을 생성한 사용자 ID
    type ENUM('like', 'comment', 'follow', 'mention', 'dm') NOT NULL, -- 알림 유형
    content TEXT, -- 알림 내용
    reference_id BIGINT, -- 관련된 콘텐츠 ID
    is_read BOOLEAN DEFAULT FALSE, -- 읽음 여부
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 알림 생성 시간
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- 외래 키, 사용자 ID와 연관됨
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE SET NULL -- 외래 키, 생성자 ID와 연관됨
);
```

**인덱스 추가**:

```sql
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
```

### 11. `subscriptions` (구독 테이블)

**설명**: 유저의 구독 정보를 저장하는 테이블. 각 유저의 구독 플랜 및 만료 일자를 저장합니다.

**테이블 정의**:

```sql
CREATE TABLE subscriptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- 구독 고유 식별자
    user_id BIGINT NOT NULL, -- 구독자 (사용자 ID)
    plan ENUM('free', 'basic', 'premium') DEFAULT 'free' NOT NULL, -- 구독 플랜
    expires_at TIMESTAMP, -- 구독 만료 일자
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 구독 생성 시간
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- 외래 키, 사용자 ID와 연관됨
);
```

### 12. `dms` (다이렉트 메시지 테이블)

**설명**: 사용자 간의 다이렉트 메시지를 저장하는 테이블. 각 메시지의 발신자, 수신자 및 내용을 저장합니다.

**테이블 정의**:

```sql
CREATE TABLE dms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- 메시지 고유 식별자
    sender_id BIGINT NOT NULL, -- 발신자 (사용자 ID)
    receiver_id BIGINT NOT NULL, -- 수신자 (사용자 ID)
    message TEXT NOT NULL, -- 메시지 내용
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 메시지 생성 시간
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE, -- 외래 키, 발신자 ID와 연관됨
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE -- 외래 키, 수신자 ID와 연관됨
);
```

### 13. `user_activity_logs` (사용자 활동 로그 테이블)

**설명**: 사용자 활동 로그를 저장하는 테이블. 로그인, 로그아웃, 게시글 생성 및 삭제, 댓글 작성 등의 활동을 기록합니다.

**테이블 정의**:

```sql
CREATE TABLE user_activity_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- 활동 로그 고유 식별자
    user_id BIGINT NOT NULL, -- 사용자 ID
    activity_type ENUM('login', 'logout', 'post_created', 'post_deleted', 'comment_created') NOT NULL, -- 활동 유형
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 활동 발생 시간
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- 외래 키, 사용자 ID와 연관됨
);
```
