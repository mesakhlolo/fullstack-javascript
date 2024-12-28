import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <h1>Page Not Found ☹️</h1>
      <h3>
        Go to Homepage : <Link to="/">Homepage</Link>
      </h3>
    </>
  );
};

export default PageNotFound;
