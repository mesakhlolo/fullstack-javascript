import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Post.css";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  });

  return (
    <div className="post-container">
      <div className="post-content">
        <div className="post-title">{postObject.title}</div>
        <div className="post-body">{postObject.postText}</div>
        <div className="post-footer">Posted by: {postObject.username}</div>
      </div>
      <div className="comments-section">
        <h3>Comments</h3>
        <div className="comment">This is a dummy comment.</div>
        <div className="comment">Another dummy comment.</div>
      </div>
    </div>
  );
}

export default Post;
