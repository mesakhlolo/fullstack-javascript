import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Post() {
  let { id } = useParams();
  useEffect(() => {
    axios.get("http://localhost:5173/posts").then((response) => {
      console.log(response.data);
    });
  }, []);

  return <div>Post ke {id}</div>;
}

export default Post;
