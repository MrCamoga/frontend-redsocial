import { useState} from 'react';

export const useForm = ({ validation, onSubmit }) => {
    const [formData,setFormData] = useState(Object.fromEntries(Object.keys(validation).map(k => [k,null])));
    const [message,setMessage] = useState('');
    const [success,setSuccess] = useState(false);

    const validateAndPrint = (name, value, input) => {
        const validations = (validation[name])(value);
        for(let [valid,msg] of validations) {
            if(!valid) {
                setMessage(msg);
                input.setCustomValidity(msg);
                return msg;
            }
        }
        input.setCustomValidity("");
        return "";
    }

    const handleInputChange = (event) => {
        const {name,value} = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setMessage(validateAndPrint(name, value, event.target));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        for(const [field,value] of Object.entries(formData)) {
            if(validateAndPrint(field,value,e.target[field])) return;
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