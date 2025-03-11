import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  return <h1>게시글 {id} 상세 페이지</h1>;
};

export default PostDetail;
