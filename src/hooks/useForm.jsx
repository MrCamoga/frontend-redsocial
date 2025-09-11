import { useState} from 'react';

export const useForm = ({ validation, onSubmit }) => {
    const [formData,setFormData] = useState({});
    const [message,setMessage] = useState('');
    const [success,setSuccess] = useState(false);

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

    const handleInputChange = (event) => {
        const {name,value} = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        const msg = validateAndPrint(name, value);
        setMessage(msg);
        event.target.setCustomValidity(msg);
        console.log(formData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        for(const [field,value] of Object.entries(formData)) {
            if(validateAndPrint(field,value)) return;
        }
        try {
            await onSubmit(e.target);
            setSuccess(true);
        } catch(error) {
            setMessage(error.message || error);
        }
    };

    return {
        formData, message, success, handleInputChange, handleSubmit
    };
};