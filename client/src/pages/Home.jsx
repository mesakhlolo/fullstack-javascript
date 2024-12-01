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

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:8080/likes",
        { PostId: postId },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  };

  return (
    <>
      {listOfPosts.map((post, key) => (
        <div className="post" key={key}>
          <div className="title">{post.title}</div>
          <div className="body" onClick={() => navigate(`/post/${post.id}`)}>
            {post.postText}
          </div>
          <div className="footer">
            {post.username}

            <button
              onClick={() => {
                likeAPost(post.id);
              }}
            >
              Like
            </button>
            <span>{post.Likes.length}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
