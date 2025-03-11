import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Header = () => {
    const username = useAuthStore((state) => state.username);

    return (
        <header>
          <h1>불고기 블로그</h1>
          {username ? <Link to={`/my-blog-home/${username}`}>내 블로그</Link> : <Link to="/login">로그인</Link>}
        </header>
      );
    };
    
    export default Header;