import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="app">
      {listOfPosts.map((post, key) => (
        <div className="post" key={key}>
          <div className="title">{post.title}</div>
          <div className="body">{post.postText}</div>
          <div className="footer">{post.username}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
