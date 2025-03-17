import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";


const Home = () => {
  const { isAuthenticated } = useAuthStore();

    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Welcome to My Blog</h1>
        {!isAuthenticated && (
          <div className="mt-4">
            <Link to="/login" className="text-green-500 underline">
            login
            </Link>
          </div>
        )}
    </div>
    );
  };
  
  export default Home;
  