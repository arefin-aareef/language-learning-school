import { Helmet } from "react-helmet-async";
import PopularClass from "../../Home/PopularClass/PopularClass";

const Classes = () => {
    return (
        <div>
            <Helmet>
                <title>Pyrates School | Classes</title>
            </Helmet>
            <PopularClass></PopularClass>
        </div>
    );
};

export default Classes;