import React, { useState } from 'react';
import styles from './Thirsty.module.css'

export function LoginForm({ onSubmit }) {
    const [submit, setSubmit] = useState({
        email: "",
        password: ""
    })

    const [showPass, setShowPass] = useState(false)
    const [render, setRender] = useState(false)

    function handleSubmit(e) {
        if (!emailError(submit.email) && !passError(submit.password)) {
            onSubmit(submit)
        }
        else {
            setRender(true)
            e.preventDefault()
        }
    }

    function emailError(email) {
    if (email.length == 0) {
        return (<div className={styles.error}>
            <span>Por favor introduza o seu endereço de email.</span>
        </div>)}
    }

    function passError(pass) {
        if (pass.length == 0) {
            return (
            <div className={styles.error}>
                <span>Por favor introduza a sua password.</span>
            </div>)
        }
    }

    return (
        <div>
            <form className={styles.form} method="get" onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.main}>
                    <h1>Login</h1>
                    <div className={styles.field}>
                        <label className={styles.section}>Email</label><br></br>
                        <input className={styles.input} placeholder="someone@example.com" type="text" onChange={(e) => setSubmit((t) => { return { ...t, email: e.target.value } })}/>
                        {render ? emailError(submit.email) : <div className={styles.error}>󠀡󠀡</div>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.section}>Password</label><br></br>
                        <input className={styles.input} placeholder="A1b2C3d$" type={showPass ? "text" : "password"} onChange={(e) => setSubmit((t) => { return { ...t, password: e.target.value } })}/> <button type="button" className={styles.pwbutton} onClick={() => setShowPass((e) => !e)}>{!showPass ? <span class="material-icons">visibility</span> : <span class="material-icons">visibility_off</span>}</button>
                        {render ? passError(submit.password) : <div className={styles.error}>󠀡󠀡</div>}
                    </div>
                    <div>
                        <button type="submit" className={styles.submit}>Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
