import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/authSlice';
import "./Register.scss";
import { useForm } from '../../hooks/useForm';

const Register = () => {
    const dispatch = useDispatch();
    
    const validation = {
        password: value => [
            [/[a-z]+/.test(value), 'Password must contain lower case letters'],
            [/[A-Z]+/.test(value), 'Password must contain upper case letters'],
            [/[0-9]+/.test(value), 'Password must contain numbers'],
            [/[^A-Za-z0-9]+/.test(value), 'Password must contain special symbols'],
            [value.length >= 8, 'Password must be 8 characters or longer'],
        ],
        reppassword: value => [[value == formData.password, 'Passwords do not match']],
        username: value => {
            value = value.trim();
            return [[value.length >= 4 && value.length <= 24, 'Username must be 4 to 24 characters long']]
        },
        screenname: value => [[value.trim().length > 0, "Name cannot be empty"]],
        email: value => [[/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),"Invalid email"]]
    };

    const onSubmit = (form) => {
        return dispatch(register(new FormData(form))).unwrap();
    };

    const { formData, message, success, handleInputChange, handleSubmit } = useForm({validation, onSubmit });
    
    return <div className='signForm'>{success ? 
            <>
                <h1>Sign in successful!</h1>
                <p>Please check your email to verify your account.</p>
            </>:
        
            <form onSubmit={handleSubmit}>
                <h1>Join now!</h1>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input id="email" name='email' type='text' placeholder='Email' onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input id="password" name='password' type='text' placeholder='Password' onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor='reppassword'>Repeat password:</label>
                    <input id="reppassword" name='reppassword' type='password' placeholder='Repeat password' onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input id="username" name='username' type='text' placeholder='Username' onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input id="name" name='screenname' type='text' placeholder='Screen name' onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor='avatar'>Profile picture:</label>
                    <input id="avatar" name='avatar' type='file' />
                </div>
                <span className="error">{message}</span>
                <input type='submit' value='Register'/>
            </form>
        }
        </div>
    ;
};

export default Register;