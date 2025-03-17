import { useAuth } from "@/features/auth/useAuth";
import Header from "./Header";

const MyBlogHome = () => {
  const { handleLogout, refreshTokenManually, isAuthenticated } = useAuth();

  return (
    <header className="flex justify-between p-4 border-b">
      <h1 className="text-lg font-bold">Bulgogi Blog</h1>
      <Header /> {/* Header 컴포넌트를 사용 */}
      {isAuthenticated ? (
        <div className="flex gap-4">
          <button onClick={refreshTokenManually} className="text-blue-500 border p-2 rounded">
            로그인 연장
          </button>
          <button onClick={handleLogout} className="text-red-500 border p-2 rounded">
            로그아웃
          </button>
        </div>
      ) : null}
    </header>
  );
};

export default MyBlogHome;