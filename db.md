# Bulgogi 블로그 플랫폼 데이터베이스 설계

## ER 다이어그램

### 1. **기본 ER 다이어그램**

```mermaid
erDiagram
    users {
        BIGINT id
        VARCHAR email
        VARCHAR password_hash
        VARCHAR username
        TEXT profile_image
        TEXT bio
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    blog_homes {
        BIGINT id
        BIGINT user_id
        VARCHAR url_slug
        VARCHAR title
        TEXT description
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    posts {
        BIGINT id
        BIGINT user_id
        BIGINT blog_home_id
        BIGINT category_id
        VARCHAR title
        VARCHAR slug
        TEXT content
        TEXT excerpt
        TEXT featured_image
        INT reading_time
        INT view_count
        BOOLEAN is_premium
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    tags {
        BIGINT id
        VARCHAR name
    }

    post_tags {
        BIGINT post_id
        BIGINT tag_id
    }

    comments {
        BIGINT id
        BIGINT post_id
        BIGINT user_id
        BIGINT parent_id
        TEXT content
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    follows {
        BIGINT follower_id
        BIGINT following_id
        TIMESTAMP created_at
    }

    likes {
        BIGINT user_id
        BIGINT post_id
        TIMESTAMP created_at
    }

    categories {
        BIGINT id
        BIGINT user_id
        VARCHAR name
        TEXT description
    }

    notifications {
        BIGINT id
        BIGINT user_id
        BIGINT sender_id
        ENUM type
        TEXT content
        BIGINT reference_id
        BOOLEAN is_read
        TIMESTAMP created_at
    }

    subscriptions {
        BIGINT id
        BIGINT user_id
        ENUM plan
        TIMESTAMP expires_at
        TIMESTAMP created_at
    }

    dms {
        BIGINT id
        BIGINT sender_id
        BIGINT receiver_id
        TEXT message
        TIMESTAMP created_at
    }

    user_activity_logs {
        BIGINT id
        BIGINT user_id
        ENUM activity_type
        TIMESTAMP created_at
    }

    %% 관계 설정
    users ||--o| blog_homes : "owns"
    users ||--o{ posts : "writes"
    users ||--o{ comments : "writes"
    users ||--o{ follows : "follows"
    users ||--o{ likes : "likes"
    users ||--o{ subscriptions : "subscribes"
    users ||--o{ dms : "sends"
    users ||--o{ user_activity_logs : "logs"

    blog_homes ||--o{ posts : "contains"

    posts ||--o{ comments : "has"
    posts ||--o{ likes : "receives"
    posts ||--o{ post_tags : "tagged"

    tags ||--o{ post_tags : "used in"

    comments ||--o{ comments : "replies to"

    categories ||--o{ posts : "categorizes"

    notifications ||--o{ users : "notifies"
```

### 2. **게시글 관련 ER 다이어그램**

```mermaid
erDiagram
    User ||--o{ Post : "authors"
    User ||--o{ Comment : "writes"
    User ||--o{ PostFolderCategory : "owns"

    Post ||--o{ PostImage : "has"
    Post ||--o{ Comment : "has"
    Post }o--|| Topic : "belongs to"
    Post }o--o{ Tag : "has"
    Post }o--|| PostFolderCategory : "organized in"

    PostTag }|--|| Post : "references"
    PostTag }|--|| Tag : "references"

    Topic ||--o{ Post : "contains"
    PostFolderCategory ||--o{ Post : "contains"

    User {
        BIGINT id PK
        VARCHAR username UNIQUE
        VARCHAR email UNIQUE
    }

    Post {
        BIGINT id PK
        VARCHAR title
        BIGINT author_id FK
        BIGINT topic_id FK
        DATETIME created_at
        DATETIME updated_at
    }

    PostContent {
        BIGINT id PK
        BIGINT post_id FK
        TEXT content
    }

    PostImage {
        BIGINT id PK
        BIGINT post_id FK
        VARCHAR image_url
        DATETIME created_at
    }

    Comment {
        BIGINT id PK
        BIGINT post_id FK
        BIGINT author_id FK
        TEXT content
        DATETIME created_at
        DATETIME updated_at
    }

    Tag {
        BIGINT id PK
        VARCHAR name
    }

    PostTag {
        BIGINT post_id PK, FK
        BIGINT tag_id PK, FK
    }

    Topic {
        BIGINT id PK
        VARCHAR name
    }

    PostFolderCategory {
        BIGINT id PK
        BIGINT user_id FK
        VARCHAR name
    }
```

------

## 테이블 설계

### 1. `users` (사용자 정보)

```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    email VARCHAR(255) UNIQUE NOT NULL, 
    password_hash VARCHAR(255) NOT NULL, 
    username VARCHAR(50) UNIQUE NOT NULL, 
    profile_image TEXT, 
    bio TEXT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);
```

### 2. `blog_homes` (블로그 홈)

```sql
CREATE TABLE blog_homes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    user_id BIGINT UNIQUE NOT NULL, 
    url_slug VARCHAR(100) UNIQUE NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    description TEXT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);
```

### 3. `posts` (게시글)

```sql
CREATE TABLE posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    user_id BIGINT NOT NULL, 
    blog_home_id BIGINT NOT NULL, 
    category_id BIGINT, 
    title VARCHAR(255) NOT NULL, 
    slug VARCHAR(255) UNIQUE NOT NULL, 
    content TEXT NOT NULL, 
    excerpt TEXT, 
    featured_image TEXT, 
    reading_time INT, 
    view_count INT DEFAULT 0, 
    is_premium BOOLEAN DEFAULT FALSE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, 
    FOREIGN KEY (blog_home_id) REFERENCES blog_homes(id) ON DELETE CASCADE, 
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL 
);
```

### 4. `tags` (태그 테이블)

```sql
CREATE TABLE tags (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(100) UNIQUE NOT NULL 
);
```

### 5. `post_tags` (게시글-태그 매핑 테이블)

```sql
CREATE TABLE post_tags (
    post_id BIGINT NOT NULL, 
    tag_id BIGINT NOT NULL, 
    PRIMARY KEY (post_id, tag_id), 
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE, 
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE 
);
```

### 6. `comments` (댓글)

```sql
CREATE TABLE comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    post_id BIGINT NOT NULL, 
    user_id BIGINT NOT NULL, 
    parent_id BIGINT, 
    content TEXT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, 
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE SET NULL 
);
```


#### 7. `post_contents` (게시글 내용)

```sql
CREATE TABLE post_contents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    post_id BIGINT NOT NULL, 
    content TEXT NOT NULL, 
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE 
);
```

#### 8. `post_images` (게시글 이미지)

```sql
CREATE TABLE post_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    post_id BIGINT NOT NULL, 
    image_url TEXT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE 
);
```

#### 9. `topics` (주제)

```sql
CREATE TABLE topics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NOT NULL
);
```

#### 10. `post_folder_categories` (게시글 폴더 카테고리)

```sql
CREATE TABLE post_folder_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    user_id BIGINT NOT NULL, 
    name VARCHAR(255) NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);
```
