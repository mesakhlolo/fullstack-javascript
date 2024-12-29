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
    username: "",
  };

  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!authState.status) {
      navigate("/login");
    }
  }, []);

  const onSubmit = (data) => {
    axios.post("http://localhost:8080/posts", data).then((response) => {
      console.log(response.status);
      navigate(`/`);
    });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().max(255, "Post text is too long").required(),
    username: Yup.string().min(3).max(15).required(),
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
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              id="username"
              name="username"
              placeholder="Ex. Jotaro88..."
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
