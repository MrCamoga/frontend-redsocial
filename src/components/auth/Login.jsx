import { login } from '../../redux/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';

const LoginView = () => {
    const dispatch = useDispatch();

    const onSubmit = async () => {
        return dispatch(login(formData)).unwrap();
    };

    const validation = {
        password: value => [
            [value.length > 0, 'Enter a password'],
        ],
        username: value => {
            value = value.trim();
            return [[value.length > 0, 'Enter a username or email']];
        },
    };

    const { formData, message, handleInputChange, handleSubmit } = useForm({validation, onSubmit });

    return (
        <div className='signForm'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div>
                    <label htmlFor='username'>Email or username:</label>
                    <input type="text" name='username' onChange={handleInputChange} placeholder='Username or email' required/>
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input type="password" name='password' onChange={handleInputChange} placeholder='Password' required/>
                </div>
                <span className='error'>{message}</span>
                <input type='submit' value='Login'/>
            </form>
        </div>
    );
};

export default LoginView;