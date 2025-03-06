# Bulgogi


### **프로젝트 시스템 구조: "불고기"**

#### 1. **User Entity**

- 기능

  :

  - **이메일, 비밀번호**로 로그인 (JWT 인증 방식 사용)
  - 사용자 정보 (이메일, 비밀번호, 이름, 프로필 이미지 등)
  - 유저의 **고유한 블로그 홈 URL** (예: `@kumugu` → `http://bulgogi.com/blogHome/@kumugu`)
  - **팔로우/팔로잉 관계** (자기 참조 다대다 관계)
  - **DM**을 통한 개인 메시지 전송 (친구 시스템은 추후 메신저 기능 추가 시 고려)
  - **구독 결제 시스템**: 무료/유료 모델을 통해 게시글 작성 제한 등의 차별화

#### 2. **User Settings Entity**

- 기능

  :

  - **자기소개** 텍스트 저장
  - **프로필 이미지** URL 저장
  - **언어 설정** (예: `en`, `ko`)
  - **테마 설정** (예: `light`, `dark`)
  - **이메일 알림 설정** 여부
  - **비밀번호 변경** 및 **이메일 변경** 기능

#### 3. **Markdown Editor Settings Entity**

- 기능

  :

  - **단축키 설정**: 사용자가 설정한 단축키 저장
  - **편집기 테마 설정** (예: `light`, `dark`)
  - **자동 저장** 여부

#### 4. **BlogHome Entity**

- 기능

  :

  - 유저의 고유 블로그 홈 URL 할당 (예: `@username`)
  - **카테고리**별 게시글 작성 기능
  - 게시글에 **태그** 추가 (#태그 기능)
  - 게시글에 대한 **댓글**, **좋아요**, **공유** 기능
  - **구독 기능**: 다른 유저의 블로그를 구독

#### 5. **Post Entity (게시글)**

- 기능

  :

  - **게시글 작성 및 편집** (마크다운 편집기 사용)
  - 각 게시글의 **카테고리**, **태그**, **댓글**, **좋아요**, **공유** 기능 관리

#### 6. **Follow/Following System (팔로우 시스템)**

- 기능

  :

  - 유저가 **다른 유저를 팔로우**하거나 **팔로우 당하는** 관계 설정
  - 팔로우/팔로잉 관계를 위한 `Follow` 테이블 (follower_id, following_id)

#### 7. **구독 결제 시스템**

- 기능

  :

  - **무료 모델**: 하루에 작성 가능한 게시글 수 5개 제한
  - **유료 모델**: 하루에 작성 가능한 게시글 수 50개 제한
  - 구체적인 결제 상품은 기능 추가 시 구상 예정

#### 8. **DM (Direct Message) System**

- 기능

  :

  - 유저 간 **개인 메시지 전송** 기능

------

### **데이터베이스 설계 예시**

1. **User** 테이블:
   - `id`, `email`, `password`, `name`, `profile_image_url`, `created_at` 등
2. **UserSettings** 테이블:
   - `user_id`, `bio`, `profile_image_url`, `language`, `theme`, `email_notifications`
3. **MarkdownSettings** 테이블:
   - `user_id`, `shortcuts` (JSON 형태로 저장), `auto_save`, `editor_theme`
4. **BlogHome** 테이블:
   - `user_id`, `home_url`, `created_at`
5. **Post** 테이블:
   - `id`, `user_id`, `content`, `category`, `tags`, `created_at`, `updated_at`
6. **Follow** 테이블:
   - `follower_id`, `following_id`
7. **Subscription** 테이블:
   - `user_id`, `subscription_type`, `created_at`, `expires_at`
8. **DM** 테이블:
   - `sender_id`, `receiver_id`, `message`, `created_at`
