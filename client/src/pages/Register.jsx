import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../styles/Register.css";

function Register() {
  const initialValue = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:8080/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div className="register-container">
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="create-post-form">
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              id="username"
              name="username"
              placeholder="Ex. Jotaro88..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <ErrorMessage name="password" component="span" />
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Your Password..."
            />
          </div>
          <button type="submit" className="submit-button">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
