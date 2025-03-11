import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const MyBlogHome = () => {
  const { username } = useParams();
  return <h1>{username}의 블로그 홈</h1>;
};

export default MyBlogHome;
