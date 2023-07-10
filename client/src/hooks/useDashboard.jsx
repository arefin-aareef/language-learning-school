import { useContext } from 'react';
import { useQuery } from 'react-query'
import { AuthContext } from '../providers/AuthProvider';

const useDashboard = () => {
    const {user} = useContext(AuthContext)
    const token = localStorage.getItem('access-token')

    const { refetch, data: dashboard = [] } = useQuery({
        queryKey: ['dashboard', user?.email],
        queryFn: async() => {
            const res = await fetch(`https://school-server-six.vercel.app/dashboard?email=${user?.email}`, {headers : {
                authorization: `bearer ${token}`
            }})
            return res.json()
        }
    })

    return [dashboard, refetch]

}

export default useDashboard;