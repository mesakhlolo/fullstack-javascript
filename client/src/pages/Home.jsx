import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <>
      {listOfPosts.map((post, key) => (
        <div
          className="post"
          key={key}
          onClick={() => navigate(`/post/${post.id}`)}
        >
          <div className="title">{post.title}</div>
          <div className="body">{post.postText}</div>
          <div className="footer">{post.username}</div>
        </div>
      ))}
    </>
  );
};

export default Home;
