import {Navigate} from 'react-router-dom';
import {useAuth} from '../../Context/authContext';

const ProtectedRoute = ({children}) => { //  PROTECTED ROUTE
    const {user} = useAuth();
    return user ? children : <Navigate to="/" />; //  REDIRECT TO LOGIN PAGE

};

export default ProtectedRoute;
