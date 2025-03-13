import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

const MyBlogHome = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const onLogout = async () => {
    await handleLogout();
    navigate("/");
  }

  return ( 
    <div>
      <h1>{username}의 블로그 홈</h1>
      <button onClick={handleLogout} className="text-red-500 border p-2 rounded">
        로그아웃
      </button>
    </div>
  );
};

export default MyBlogHome;

