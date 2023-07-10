import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch("https://school-server-six.vercel.app/users");
    return res.json();
  });

  const handleMakeAdmin = (user) => {
    fetch(`https://school-server-six.vercel.app/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Admin Created Successful",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };

  const handleMakeInstructor = (user) => {
    fetch(`https://school-server-six.vercel.app/users/instructor/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Instructor Created Successful",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://school-server-six.vercel.app/users/${user._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>Pyrates School | Manage Users</title>
      </Helmet>
      <h3 className="text-3xl font-semibold text-center my-4">
        Total Users: {users.length}
      </h3>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "admin"
                  ) : user.role === "instructor" ? (
                    "instructor"
                  ) : (
                    <div>
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-ghost btn-xs bg-orange-400 text-white"
                      >
                        Make Admin
                      </button>
                      <button
                        onClick={() => handleMakeInstructor(user)}
                        className="btn btn-ghost btn-xs bg-orange-400 text-white ms-1"
                      >
                        Make Instructor
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost btn-xs bg-red-400 text-white"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
