import { login } from '../../redux/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';

const LoginView = () => {
    const dispatch = useDispatch();

    const onSubmit = () => dispatch(login(formData)).unwrap();

    const validation = {
        username: value => {
            return [[value && value.trim().length > 0, 'Enter a username or email']];
        },
        password: value => [
            [value && value.length > 0, 'Enter a password'],
        ],
    };

    const { formData, message, handleInputChange, handleSubmit } = useForm({validation, onSubmit });

    return (
        <div className='signForm'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div>
                    <label htmlFor='username'>Email or username:</label>
                    <input type="text" className={formData.username && 'validate'} name='username' onChange={handleInputChange} placeholder='Username or email'/>
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input type="password" className={formData.password && 'validate'} name='password' onChange={handleInputChange} placeholder='Password'/>
                </div>
                <span className='error'>{message}</span>
                <input type='submit' value='Login'/>
            </form>
        </div>
    );
};

export default LoginView;