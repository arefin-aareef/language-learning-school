import useClasses from "../../../hooks/useClasses";
import ClassItem from "../../Shared/ClassItem/ClassItem";

const PopularClass = () => {

    const [classes] = useClasses()

    return (
        <div className="my-4">
            <h3 className="text-3xl text-center my-8 font-semibold">Popular Classes</h3>
        <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {classes.map((item) => (
                    <ClassItem
                        key={item._id}
                        item={item}
                    />
                ))}
            </div>
        </div>
        </div>
    );
};

export default PopularClass;
