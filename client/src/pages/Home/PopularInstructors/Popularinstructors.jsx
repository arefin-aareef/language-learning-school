import useInstructors from "../../../hooks/useInstructors";
import InstructorItem from "../../Shared/InstructorItem/InstructorItem";

const PopularInstructors = () => {
    const [instructors] = useInstructors() 

  return (
    <div className="my-4">
      <h3 className="text-3xl text-center my-8 font-semibold">
        Our Qualified Instructors
      </h3>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {instructors.map((item) => (
            <InstructorItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularInstructors;
