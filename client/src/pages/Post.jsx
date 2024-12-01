import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "../styles/Post.css";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:8080/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:8080/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post(
        "http://localhost:8080/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const newCommentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, newCommentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:8080/comments/${id}`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then(() => {
          setComments(
            comments.filter((comment) => {
              return comment.id != id;
            })
          );
        });
    }
  };

  return (
    <div className="post-container">
      <div className="post-content">
        <div className="post-title">{postObject.title}</div>
        <div className="post-body">{postObject.postText}</div>
        <div className="post-footer">Posted by: {postObject.username}</div>
      </div>
      <div className="comments-section">
        <h3>Comments</h3>
        <div className="add-comment-container">
          <input
            type="text"
            placeholder="Add some comment..."
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="list-of-comments">
          {comments.map((comment, key) => (
            <div key={key} className="comment">
              <div className="comment-header">
                <span className="comment-username">{comment.username}</span>

                {authState.username === comment.username && (
                  <button
                    className="delete-comment-button"
                    onClick={() => deleteComment(key)}
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="comment-body">{comment.commentBody}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
