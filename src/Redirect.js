import { Navigate } from 'react-router-dom';
import AuthContext from '~/AuthContext';
import { useContext } from 'react';
export default function Redirect({ to }) {
    const { currentUser } = useContext(AuthContext);
    return currentUser ? <Navigate to={to} /> : null;
}
