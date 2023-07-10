import { Link } from "react-router-dom";
import errorImg from "../../assets/error.jpg";

const Error = () => {
  return (
    <div className="flex mt-5 pt-5">
  <div className="w-1/2 flex items-center justify-center">
    <img className="w-1/2" src={errorImg} alt="Error"></img>
  </div>

  <div className="w-1/2 flex flex-col items-center justify-center">
    <h1 className="text-4xl text-red-500">Error 404</h1>
    <p className="text-xl my-4">
      Oops! The page you are looking for could not be found.
    </p>
    <Link className="text-2xl text-blue-500 underline" to="/">
      Go back to home
    </Link>
  </div>
</div>

  );
};

export default Error;
