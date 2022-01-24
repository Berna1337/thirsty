import { useState, useEffect } from "react";
import { validateInfo } from "./validarinfo";



export const useForm = validateInfo  => {
    const [values, setValues] =useState({
        username: '',
        email:'',
        password: '',
        password2:''
    })
    const [errors, setErrors] = useState({})

    // Quando se alterar algo , esta function vai dar update as valores

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
            // Aqui estou a dar target a todos os names
            // que estao no form.js caso sejam alterados!
        })
    }
    
    const handleSubmit = e =>{
        e.preventDefault();

        setErrors(validateInfo(values))

    }
    return {handleChange, values, handleSubmit, errors};
}