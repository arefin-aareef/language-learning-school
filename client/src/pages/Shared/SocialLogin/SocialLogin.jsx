import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext);
    const navigate = useNavigate()

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
            const loggedInUser = result.user;
            console.log(loggedInUser);
            const saveUser = {name: loggedInUser.displayName, email: loggedInUser.email}

            fetch('https://school-server-six.vercel.app/users', {
            method: "POST",
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(saveUser)
          })
          .then(res => res.json())
          .then(() => {
              navigate('/')
            
          })

           
        })
    }
  return (
    <div>
      <div className="divider"></div>
      <div className='w-full text-center my-4'>
      <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
        <FaGoogle></FaGoogle>
      </button>
      </div>
    </div>
  );
};

export default SocialLogin;
