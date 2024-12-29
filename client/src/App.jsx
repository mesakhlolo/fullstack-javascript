import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/login", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState((prevState) => ({ ...prevState, status: false }));
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      localStorage.removeItem("accessToken");
      setAuthState({ username: "", id: 0, status: false });
      navigate("/login");
    }
  };

  return (
    <div className="app">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <nav className="navbar">
          <>
            {!authState.status ? (
              <div className="navbar-right">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            ) : (
              <>
                <div className="navbar-links">
                  <Link to="/">Home</Link>
                  <Link to="/createpost">Create A Post</Link>
                </div>
                <div className="navbar-right">
                  <button className="logout-button" onClick={logout}>
                    Logout
                  </button>
                  <div className="navbar-username">{authState.username}</div>
                </div>
              </>
            )}
          </>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
