import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import userImg from "../../../assets/user.png";
import useDashboard from "../../../hooks/useDashboard";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dashboard] = useDashboard() 

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/instructors">Instructors</Link>
      </li>
      <li>
        <Link to="/classes">Classes</Link>
      </li>
      {user && (
        <li>
          <Link to="/dashboard/home">
            <button className="">
              Dashboard
              <div className="badge badge-secondary ms-1">+{dashboard?.length || 0}</div>
            </button>
          </Link>
        </li>
      )}
      {user ? (
        <>
          <li onClick={handleLogOut}>
            <Link to="/">Logout</Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
      {user && (
        <img
          title={user.displayName ? user.displayName : user.email}
          className="mx-2"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          src={user.photoURL ? user.photoURL : userImg}
        ></img>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Pyrates School
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
    </div>
  );
};

export default Navbar;
