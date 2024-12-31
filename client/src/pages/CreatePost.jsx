import "../styles/CreatePost.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../helpers/AuthContext";

function CreatePost() {
  let navigate = useNavigate();

  const initialValue = {
    title: "",
    postText: "",
  };

  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [authState.status, navigate]);

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8080/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.status);
        navigate(`/`);
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().max(255, "Post text is too long").required(),
  });

  return (
    <div className="create-post-container">
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="create-post-form">
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <ErrorMessage name="title" component="span" />
            <Field id="title" name="title" placeholder="Ex. Title..." />
          </div>
          <div className="form-group">
            <label htmlFor="postText">Post: </label>
            <ErrorMessage name="postText" component="span" />
            <Field
              id="postText"
              name="postText"
              placeholder="Ex. Some Post..."
            />
          </div>
          <button type="submit" className="submit-button">
            Create Post
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
