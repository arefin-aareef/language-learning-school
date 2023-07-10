import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useDashboard from "../../../hooks/useDashboard";
import { AuthContext } from "../../../providers/AuthProvider";

const ClassItem = ({ item }) => {
  const { _id, image, name, instructorName, availableSeats, price } = item;
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  const [, refetch] = useDashboard()

  const handleAddToDashboard = (item) => {
    console.log(item);
    if(user && user.email) {
      const selectedClass = {classId: _id, name, image, price, email: user.email}
      fetch('https://school-server-six.vercel.app/dashboard', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(selectedClass)
      })
      .then(res => res.json())
      .then(data => {
        if(data.insertedId) {
          refetch()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your Class Added To Dashboard',
            showConfirmButton: false,
            timer: 1500
          })
        }
        
      })
    }
    else {
      Swal.fire({
        title: 'Please login to select a course',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
    }
  }

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src={image}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Instructor: {instructorName}</p>
        <p>Available Seats: {availableSeats}</p>
        <p>Price: ${price}</p>
        <div className="card-actions justify-end">
          <button 
            onClick={() => handleAddToDashboard(item)}
            className="btn btn-primary"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassItem;
