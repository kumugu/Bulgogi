import { useParams } from "react-router-dom";

const MyInfo = () => {
  const { username } = useParams();
  return <h1>{username}의 정보 페이지</h1>;
};

export default MyInfo;
