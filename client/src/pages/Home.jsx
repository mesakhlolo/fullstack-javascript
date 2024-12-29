import axios from "axios";
import { useState, useEffect, useContext } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { AuthContext } from "../helpers/AuthContext";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPost] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!authState.status) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:8080/posts", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPost(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
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
          // logic like post number (like and unlike)
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

    if (likedPosts.includes(postId)) {
      setLikedPost(
        likedPosts.filter((id) => {
          return id != postId;
        })
      );
    } else {
      setLikedPost([...likedPosts, postId]);
    }
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
            <div className="writer-username">Write by: {post.username}</div>
            <div className="likes-button">
              {likedPosts.includes(post.id) ? (
                <ThumbUpAltIcon
                  onClick={() => {
                    likeAPost(post.id);
                  }}
                />
              ) : (
                <ThumbUpOffAltIcon
                  onClick={() => {
                    likeAPost(post.id);
                  }}
                />
              )}
            </div>
            <span>{post.Likes.length}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
