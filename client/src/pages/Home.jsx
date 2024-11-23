import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/Home.css";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <>
      {listOfPosts.map((post, key) => (
        <div className="post" key={key}>
          <div className="title">{post.title}</div>
          <div className="body">{post.postText}</div>
          <div className="footer">{post.username}</div>
        </div>
      ))}
    </>
  );
};

export default Home;
