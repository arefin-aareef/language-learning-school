import { Helmet } from "react-helmet-async";
import PopularInstructors from "../../Home/PopularInstructors/Popularinstructors";


const Instructors = () => {
    return (
        <div>
            <Helmet>
                <title>Pyrates School | Instructors</title>
            </Helmet>
            <PopularInstructors></PopularInstructors>
        </div>
    );
};

export default Instructors;