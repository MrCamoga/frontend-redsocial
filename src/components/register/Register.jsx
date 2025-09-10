import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/authSlice';
import "./Register.scss";

const RegisterView = () => {
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({});
    const [message,setMessage] = useState('');
    const [success,setSuccess] = useState(false);

    const handleInputChange = (event) => {
        const {name,value} = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        const msg = validateAndPrint(name, value);
        setMessage(msg);
        event.target.setCustomValidity(msg);
    }

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
    }

    // Returns msg
    const validateAndPrint = (name, value) => {
        const validations = (validation[name])(value);
        for(let [valid,msg] of validations) {
            console.log(valid,msg)
            if(!valid) {
                setMessage(msg);
                return msg;
            }
        }
        return "";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        for(const [field,value] of Object.entries(formData)) {
            if(validateAndPrint(field,value)) return;
        }
        try {
            await dispatch(register(new FormData(e.target))).unwrap();
            setSuccess(true);
        } catch(error) {
            setMessage(error);
        }
    };

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

export default RegisterView;