import React, { useState } from 'react';
import styles from './Thirsty.module.css'

export const Formulario = () => {

    const [submit, setSubmit] = useState({
        name: "",
        age: "",
        weight: "",
        height: "",
        sex: "",
        lifestyle: "",
        clima: ""
    })

    const [render, setRender] = useState(false)

    function handleSubmit(e) {
        
        e.preventDefault()
        
        if (!nameError(submit.name) && !ageError(submit.age) && !weightError(submit.weight) && !heightError(submit.height)) {
            fetch('/submitForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submit)
            }).then(res => {
                return res.json()
            })
            .then(data => console.log(data))
            .catch(error => console.log(error))
            
            console.log(submit)
        }
        else {
            setRender(true)
        }
    }

    function nameError(name) {
        if (name.length == 0) {
            return (<div className={styles.error}>
            <span>Por favor introduza o seu nome.</span>
        </div>)
        }
    }
    function ageError(age) {
        if (age.length == 0) {
            return (<div className={styles.error}>
            <span>Por favor introduza a sua idade.</span>
        </div>)
        }

        else if (isNaN(age)) {
            return ((<div className={styles.error}>
            <span>Por favor introduza uma idade válida.</span>
        </div>))
        }

        else if (age < 0) {
            return (<div className={styles.error}>
            <span>Por favor introduza uma idade válida.</span>
        </div>)
        }
    }
    function weightError(weight) {
        if (weight.length == 0) {
            return (<div className={styles.error}>
            <span>Por favor introduza o seu peso.</span>
        </div>)
        }

        else if (isNaN(weight)) {
            return ((<div className={styles.error}>
            <span>Por favor introduza um peso válido.</span>
        </div>))
        }

        else if (weight < 0) {
            return (<div className={styles.error}>
            <span>Por favor introduza um peso válido.</span>
        </div>)
        }
    }
    function heightError(height) {
        if (height.length == 0) {
            return (<div className={styles.error}>
            <span>Por favor introduza a sua altura.</span>
        </div>)
        }

        else if (isNaN(height)) {
            return ((<div className={styles.error}>
            <span>Por favor introduza uma altura válida.</span>
        </div>))
        }

        else if (height < 0) {
            return (<div className={styles.error}>
            <span>Por favor introduza uma altura válida.</span>
        </div>)
        }
    }

    return (
    <form className={styles.form} method="get" onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.main}>
            <h1 className={styles.title}>Perfil</h1>
            <div className={styles.desc}>Por favor preencha os seguintes dados, estes serão utilizados para lhe oferecermos uma experiência personalizada.</div>
            
            <div className={styles.field}>
                <label className={styles.section}>Nome</label><br></br>
                <input 
                    placeholder="Insira o seu nome"
                    className={styles.input}
                    type = "text" 
                    // required
                    onChange={(e) => setSubmit((t) => { return { ...t, name: e.target.value } })} 
                />
                {render ? nameError(submit.name) : <div className={styles.error}>󠀡󠀡</div>}
            </div>
            <div className={styles.field}>
                <label className={styles.section}>Idade</label><br></br>
                <input 
                    placeholder="Insira a sua idade"
                    className={styles.input}
                    type = "number"
                    // required
                    onChange={(e) => setSubmit((t) => { return { ...t, age: e.target.value } })} 
                />
                {render ? ageError(submit.age) : <div className={styles.error}>󠀡󠀡</div>}
            </div>
            
            <div className={styles.field}>
                <label className={styles.section}>Peso (kg)</label><br></br>
                <input 
                    placeholder="Insira o seu peso"
                    className={styles.input}
                    type = "number"
                    // required
                    onChange={(e) => setSubmit((t) => { return { ...t, weight: e.target.value } })}
                />
                {render ? weightError(submit.weight) : <div className={styles.error}>󠀡󠀡</div>}
            </div>

            <div className={styles.field}>
                <label className={styles.section}>Altura (cm)</label><br></br>
                <input 
                    placeholder="Insira a sua altura"
                    className={styles.input}
                    type = "number"
                    // required
                    onChange={(e) => setSubmit((t) => { return { ...t, height: e.target.value } })} 
                />
                {render ? heightError(submit.height) : <div className={styles.error}>󠀡󠀡</div>}
            </div>

            <div className={styles.field}>
                <label className={styles.section}>Sexo</label><br></br>
                <select className={styles.options}>
                    <option value = "masculino" onChange={(e) => setSubmit((t) => { return { ...t, sex: e.target.value } })}>Masculino</option>
                    <option value = 'femeninio' onChange={(e) => setSubmit((t) => { return { ...t, sex: e.target.value } })}>Femenino</option>
                </select>
            </div>

            <div className={styles.field}>
                <label className={styles.section}>Estilo de vida</label><br></br>
                <select className={styles.options}>
                    <option value= "leve" onChange={(e) => setSubmit((t) => { return { ...t, lifestyle: e.target.value } })}>Atividade Leve</option>
                    <option value = 'moderada' onChange={(e) => setSubmit((t) => { return { ...t, lifestyle: e.target.value } })}>Atividade Moderada</option>
                    <option value = 'elevada' onChange={(e) => setSubmit((t) => { return { ...t, lifestyle: e.target.value } })}>Atividade Elevada</option>
                </select>
            </div>

            <div className={styles.field}>
                <label className={styles.section}>Localizacao</label><br></br>
                <select className={styles.options}>
                    <option value= "humido" onChange={(e) => setSubmit((t) => { return { ...t, clima: e.target.value } })}>Clima Frio</option>
                    <option value = 'quente' onChange={(e) => setSubmit((t) => { return { ...t, clima: e.target.value } })}>Clima Temperado</option>
                    <option value = 'quente' onChange={(e) => setSubmit((t) => { return { ...t, clima: e.target.value } })}>Clima Quente</option>
                </select>
            </div>

            <button type='submit' className={styles.submit}>Enviar</button>
        </div>
    </form>   
    )
}

export default Formulario