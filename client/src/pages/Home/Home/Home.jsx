import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import PopularClass from '../PopularClass/PopularClass';
import PopularInstructors from '../PopularInstructors/Popularinstructors';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Pyrates School | Home</title>
            </Helmet>
            <Banner></Banner>
            <PopularClass></PopularClass>
            <PopularInstructors></PopularInstructors>
        </div>
    );
};

export default Home;