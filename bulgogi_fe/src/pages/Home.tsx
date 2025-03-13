import { Link } from "react-router-dom";


const Home = () => {
    return (
      <div>
        <h1 className="text-2xl font-bold">Home</h1>
        <Link to="/login" className="text-green-500 underline">
            로그인 페이지로 이동
        </Link>
      </div>
    );
  };
  export default Home;
  