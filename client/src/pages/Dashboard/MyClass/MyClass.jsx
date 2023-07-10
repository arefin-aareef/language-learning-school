import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useDashboard from "../../../hooks/useDashboard";

const MyClass = () => {
  const [dashboard, refetch] = useDashboard();
  const total = dashboard.reduce((sum, item) => item.price + sum, 0);

  const handleDelete = item => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

            fetch(`https://school-server-six.vercel.app/dashboard/${item._id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount > 0) {
                    refetch()
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                }
            })
    }
      })
  }

  return (
    <div className="w-full">
      <Helmet>
        <title>Pyrates School | My Class</title>
      </Helmet>
      <div className="uppercase font-semibold flex justify-evenly items-center h-[60px]">
        <h2>My Selected Class: {dashboard.length}</h2>
        <h2>Total Price: ${total}</h2>
        <button className="btn btn-info">Pay</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dashboard.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button onClick={() => handleDelete(item)} className="btn btn-ghost btn-xs bg-red-400 text-white"><FaTrashAlt></FaTrashAlt></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClass;
