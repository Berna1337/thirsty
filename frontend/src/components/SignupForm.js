import { useState } from "react";
import styles from './SignupForm.module.css'

export function SignupForm ({ onSubmit }) {

    const [submit, setSubmit] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    acceptsTerms: false,
    acceptsCommunications: false
})

const [showPass, setShowPass] = useState(false)
const [showPass2, setShowPass2] = useState(false)
const [render, setRender] = useState(false)

    function handleSubmit(e) {
        if (!emailError(submit.email) && !passError(submit.password) && !passConfirm(submit.password, submit.passwordConfirmation) && !terms(submit.acceptsTerms)) {
            onSubmit(submit)
        }
        else {
            setRender(true)
            e.preventDefault()
        }
    }

    function validateEmail(email) {
        const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return EMAIL_REGEX.test(email)
    }

    function checkPasswordStrength(password) {
        if (password.length < 8) return 0;
        const regexes = [
            /[a-z]/,
            /[A-Z]/,
            /[0-9]/,
            /[~!@#$%^&*)(+=._-]/
        ]
        return regexes
            .map(re => re.test(password))
            .reduce((score, t) => t ? score + 1 : score, 0)
    }

    function emailError(email) {
    if (email.length == 0) {
        return (<div className={styles.error}>
            <span data-testid="email-error">Por favor introduza o seu endereço de email.</span>
        </div>)
    }
    else if (!validateEmail(email)) {
        return (<div className={styles.error}>
            <span data-testid="email-error">Por favor introduza um endereço de email válido.</span>
        </div>
        )
    }
}

    function passError(pass) {
        if (pass.length == 0) {
            return (
            <div className={styles.error}>
                <span data-testid="password-error">Por favor introduza a sua password.</span>
            </div>)
        }
        else if (pass.length < 8) {
            return (
            <div className={styles.error}>
                <span data-testid="password-error">A sua password deve ter no mínimo 8 caracteres.</span>
            </div>)
        }
        else if (checkPasswordStrength(pass) < 4) {
            return (
            <div className={styles.error}>
                <span data-testid="password-error">A sua password deve ter pelo menos um número, uma mínuscula, uma maiúscula e um símbolo.</span>
            </div>)
        }
    }

    function passConfirm(pass1, pass2) {
        if (pass2.length == 0) {
            return (
                <div className={styles.error}>
                    <span data-testid="passwordConfirmation-error">Por favor introduza novamente a sua password.</span>
                </div>)
        }
        else if (pass1 != pass2) {
            return (
                <div className={styles.error}>
                    <span data-testid="passwordConfirmation-error">As passwords não coincidem.</span>
                </div>)
        }
    }

    function terms(termo) {
        if (!termo) {
            return (
                <div className={styles.error}>
                <span data-testid="acceptsTerms-error">Tem de aceitar os termos e condições para criar a sua conta.</span>
            </div>)
        }
    }

    return (
        <div>
            
            <form className={styles.form} method="get" onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.main}>
                    <h1>Registar</h1>
                    <div className={styles.field}>
                        <label className={styles.section}>Email</label><br></br>
                        <input className={styles.input} placeholder="someone@example.com" data-testid="email" type="text" onChange={(e) => setSubmit((t) => { return { ...t, email: e.target.value } })}/>
                        {render ? emailError(submit.email) : <div className={styles.error}>󠀡󠀡</div>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.section}>Password</label><br></br>
                        <input className={styles.input} placeholder="A1b2C3d$" data-testid="password" type={showPass ? "text" : "password"} onChange={(e) => setSubmit((t) => { return { ...t, password: e.target.value } })}/> <button type="button" className={styles.pwbutton} data-testid="password-toggle" onClick={() => setShowPass((e) => !e)}>{!showPass ? <span class="material-icons">visibility</span> : <span class="material-icons">visibility_off</span>}<span className={styles.strength} data-testid="password-strength">{checkPasswordStrength(submit.password)}</span></button>
                        {render ? passError(submit.password) : <div className={styles.error}>󠀡󠀡</div>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.section}>Confirmar Password</label><br></br>
                        <input className={styles.input} placeholder="A1b2C3d$" data-testid="passwordConfirmation" type={showPass2 ? "text" : "password"} onChange={(e) => setSubmit((t) => { return { ...t, passwordConfirmation: e.target.value } })}/> <button type="button" className={styles.pwbutton} data-testid="passwordConfirmation-toggle" onClick={() => setShowPass2((e) => !e)}>{!showPass2 ? <span class="material-icons">visibility</span> : <span class="material-icons">visibility_off</span>}</button>
                        {render ? passConfirm(submit.password, submit.passwordConfirmation) : <div className={styles.error}>󠀡󠀡</div>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.section}>Termos e condições</label><span> </span>
                        <input className={styles.box} data-testid="acceptsTerms" type="checkbox" onChange={(e) => setSubmit((t) => { return { ...t, acceptsTerms: e.target.checked } })}/>
                        {render ? terms(submit.acceptsTerms) : <div className={styles.error}>󠀡󠀡</div>}
                    </div>
                    <div>
                        <button type="submit" className={styles.submit} data-testid="submit">Registar</button>
                    </div>
                    
                </div>
                
            </form>
        </div>
    )
}