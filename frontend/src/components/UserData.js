import React, { useState } from 'react';
import styles from './Thirsty.module.css'

export const Formulario = () => {
const [userName, setUserName] = useState('')
const [idade, setIdade] = useState(0)
const [peso, setPeso] = useState('')
const [altura, setAltura] = useState('')
const [sexo, setSexo] = useState('')
const [estiloVida, setEstiloVida] = useState('')
const [localizacao, setLocalizacao] = useState('')

    return (
    <form className={styles.form}>
        <div className={styles.main}>
            <h2 className={styles.h2}>Formulario</h2>
            
            <label className={styles.section}>UserName: </label>
            <input 
                placeholder="Insira o seu Username"
                className={styles.input}
                type = "text" 
                Required
                onChange={(e) => setUserName(e.target.value)} 
            />
            <br></br>
        
            <label className={styles.section}>Idade: </label>
            <input 
                placeholder="Insira a sua idade"
                className={styles.input}
                type = "number"
                Required
                onChange={(e) => setIdade(e.target.value)} 
            />
            <br></br>

            <label className={styles.section}>Peso(kg): </label>
            <input 
                placeholder="Insira o seu peso"
                className={styles.input}
                type = "number"
                Required
                onChange={(e) => setPeso(e.target.value)}
            />
            <br></br>

            <label className={styles.section}>Altura(cm): </label>
            <input 
                placeholder="Insira a sua altura"
                className={styles.input}
                type = "number"
                Required
                onChange={(e) => setAltura(e.target.value)} 
            />
            <br></br>

            <lable className={styles.section}>Sexo: </lable>
            <select className={styles.input}>
                <option value = "masculino" onChange={(e) => setSexo(e.target.value)}>Masculino</option>
                <option value = 'femeninio' onChange={(e) => setSexo(e.target.value)}>Femenino</option>
            </select>
            <br></br>

            <label className={styles.section}>Estilo de vida: </label>
            <select className={styles.input}>
                <option value= "leve" onChange={(e) => setEstiloVida(e.target.value)}>Atividade Leve</option>
                <option value = 'moderada' onChange={(e) => setEstiloVida(e.target.value)}>Atividade Moderada</option>
                <option value = 'elevada' onChange={(e) => setEstiloVida(e.target.value)}>Atividade Elevada</option>
                <option value = 'intensa' onChange={(e) => setEstiloVida(e.target.value)}>Atividade Intensa</option>
            </select>
            <br></br>

            <label className={styles.section}>Localizacao: </label>
            <select className={styles.input}>
                <option value= "humido" onChange={(e) => setLocalizacao(e.target.value)}>Climas Frios</option>
                <option value = 'quente' onChange={(e) => setLocalizacao(e.target.value)}>Climas Temperados</option>
                <option value = 'quente' onChange={(e) => setLocalizacao(e.target.value)}>Climas Quentes</option>
            </select>
            <br></br>

            <button className={styles.submit}>Submit</button>
        </div>
    </form>   
    )
}

export default Formulario