import React, { useEffect, useState } from 'react';
import styles from './Thirsty.module.css'
import { useNavigate } from 'react-router-dom';

export const Formulario = (props) => {


    let token = props.token
    const [submit, setSubmit] = useState({
        name: "",
        age: "",
        weight: "",
        height: "",
        sex: "masculino",
        lifestyle: "moderado",
        clima: "temperado"
    })

    const navigate = useNavigate()
    const [render, setRender] = useState(false)

    useEffect(() => {
    checkProfile()
    
    }, []);
    
    function checkProfile() {
    fetch('/api/checkProfile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            }).then(res => {
                if (res.status == 404) {
                    return
                }
                return res.json()
            })
            .then(data => {
                if (!data) return
                else setSubmit(data)
                return data
            })
            .catch(error => console.log(error))
    }

    function handleSubmit(e) {
        
        e.preventDefault()
        
        if (!nameError(submit.name) && !ageError(submit.age) && !weightError(submit.weight) && !heightError(submit.height)) {
            fetch('/api/submitForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(submit)
            }).then(res => {
                if (res.status == 200) {
                    navigate("/dashboard")
                }
                return
            })
            .catch(error => console.log(error))
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

        else if (Number(age) < 0) {
            return (<div className={styles.error}>
            <span>Por favor introduza uma idade válida.</span>
        </div>)
        }

        else if (Number(age) > 130) {
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

        else if (Number(weight) < 0) {
            return (<div className={styles.error}>
            <span>Por favor introduza um peso válido.</span>
        </div>)
        }

        else if (Number(weight) > 600) {
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

        else if (Number(height) < 0) {
            return (<div className={styles.error}>
            <span>Por favor introduza uma altura válida.</span>
        </div>)
        }

        else if (Number(height) > 300) {
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
                    value={submit.name}
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
                    value={submit.age}
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
                    value={submit.weight}
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
                    value={submit.height}
                    // required
                    onChange={(e) => setSubmit((t) => { return { ...t, height: e.target.value } })} 
                />
                {render ? heightError(submit.height) : <div className={styles.error}>󠀡󠀡</div>}
            </div>

            <div className={styles.field}>
                <label className={styles.section}>Sexo</label><br></br>
                <select className={styles.options} value={submit.sex} onChange={(e) => setSubmit((t) => { return { ...t, sex: e.target.value } })}>
                    <option value = "masculino" >Masculino</option>
                    <option value = 'femeninio' >Femenino</option>
                </select>
            </div>

            <div className={styles.field}>
                <label className={styles.section}>Estilo de vida</label><br></br>
                <select className={styles.options} value={submit.lifestyle} onChange={(e) => setSubmit((t) => { return { ...t, lifestyle: e.target.value } })}>
                    <option value= "sedentario" >Sedentário</option>
                    <option value = 'moderado' >Moderado</option>
                    <option value = 'ativo' >Ativo</option>
                </select>
            </div>

            <div className={styles.field}>
                <label className={styles.section}>Clima</label><br></br>
                <select value={submit.clima} className={styles.options} onChange={(e) => setSubmit((t) => { return { ...t, clima: e.target.value } })}>
                    <option value= "humido" >Clima Frio</option>
                    <option value = 'temperado' >Clima Temperado</option>
                    <option value = 'quente'>Clima Quente</option>
                </select>
            </div>

            <button type='submit' className={styles.submit}>Guardar</button>
        </div>
    </form>   
    )
}

export default Formulario