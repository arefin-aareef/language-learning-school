

const InstructorItem = ({item}) => {

    const {instructorName, image, numberOfStudents} = item;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Instructor: {instructorName}</h2>
    <p>Number Of Students: {numberOfStudents}</p>
  </div>
  <figure><img src={image} /></figure>
</div>
    );
};

export default InstructorItem;