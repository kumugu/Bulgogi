import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useAuth } from "../features/auth/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, refreshAccessToken } = useAuth();
  const { accessToken, username } = useAuthStore();

    useEffect(() => {
      if (!accessToken) {
        refreshAccessToken();
      }
    }, []);
    
    const handleLogin = async () => {
      try {
        await login(email, password);
  
        // 로그인 성공 시 Store에서 username 가져오기
        const username = useAuthStore.getState().username;
  
        // MyBlogHome으로 이동
        navigate(`/my-blog-home/${username}`);

      } catch (error) {
        console.error("로그인 실패", error);
      }
    };
  

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <input 
          type="email" 
          placeholder="이메일" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="비밀번호" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};


export default Login;
