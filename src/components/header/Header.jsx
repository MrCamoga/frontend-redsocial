import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, logout } from '../../redux/auth/authSlice';

import { useEffect } from 'react';

import "./Header.scss";

import { API_URL } from '../../config';

const Header = () => {
    const { user, token } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(token) dispatch(getUserInfo());
        console.log("djwaiodjwaio")
    },[token]);

    useEffect(() => {
        console.log(user);
    }, [user]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return <header className='header'>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                {user ?
                <>
                    <li><Link to={`/profile/${user.username}`}><img src={user.avatar ? `${API_URL}/media/avatar/${user._id}`:'/default_pfp.svg'} alt="Profile picture" /></Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </>:
                <>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Sign up</Link></li>
                </>
                }
            </ul>
        </nav>
    </header>
};

export default Header;