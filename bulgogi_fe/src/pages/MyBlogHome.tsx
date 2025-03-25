const MyBlogHome = () => {
  return (
    <div className="min-h-screen bg-neutral-100 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900">My Blog</h1>
        </div>

        {/* 기본 콘텐츠 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Welcome to Your Blog!</h2>
          <p className="text-sm text-neutral-600">
            여기에 블로그 콘텐츠가 표시됩니다. 사용자의 게시글이나 다른 정보를 나중에 추가할 수 있습니다.
          </p>
        </div>

        {/* 정보가 없는 상태로 사용자 정보 자리 표시 */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">User Information</h2>
          <p className="text-sm text-neutral-600">사용자 정보가 아직 없습니다.</p>
        </div>

        {/* 기타 정보 */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Blog Posts</h2>
          <p className="text-sm text-neutral-600">
            여기에 사용자의 게시글 목록이 나중에 표시될 예정입니다. 이 페이지는 현재 기본적인 레이아웃만 포함하고 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyBlogHome;
