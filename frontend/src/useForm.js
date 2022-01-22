import { useState, useEffect } from "react";


 export const useFrom = () => {
    const [values, setValues] =useState({
        username: '',
        email:'',
        password: '',
        password2:''


    })
    const [errors, setErros] = useState({})

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
    return {handleChange, values};
}

export default useFrom; 