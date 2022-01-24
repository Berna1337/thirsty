import {useState} from 'react'

export const Formulario = () => {
const [userName, setUserName] = useState('')
const [idade, setIdade] = useState(0)
const [peso, setPeso] = useState('')
const [altura, setAltura] = useState('')
const [sexo, setSexo] = useState('')
const [estiloVida, setEstiloVida] = useState('')
const [localizacao, setLocalizacao] = useState('')

    return (
        <div>
            <h2>Formulario</h2>
            <form>

            <label>UserName: </label>
            <input 
                type = "text" 
                Required
                maxLength={3}
                onChange={(e) => setUserName(e.target.value)} 
            />
            <br></br>
        
            <label>Idade: </label>
            <input 
                type = "number"
                Required
                onChange={(e) => setIdade(e.target.value)} 
            />
            <br></br>

            <label>Peso: </label>
            <input 
                type = "number"
                Required
                value = {setPeso}
                onChange={(e) => setPeso(e.target.value)}
            />
            <br></br>

            <label>Altura: </label>
            <input 
                type = "number"
                Required
                value = {setIdade}
                onChange={(e) => setAltura(e.target.value)} 
            />
            <br></br>

            <lable>Sexo: </lable>
            <select>
                <option value= "masculino">Masculino</option>
                <option value = 'femeninio'>Femenino</option>
            </select>
            <br></br>

            <label>Estilo de vida: </label>
            <select>
                <option value= "leve">Atividade Leve</option>
                <option value = 'moderada'>Atividade Moderada</option>
                <option value = 'elevada'>Atividade Elevada</option>
                <option value = 'intensa'>Atividade Intensa</option>
            </select>
            <br></br>

            <label>Localizacao: </label>
            <select>
                <option value= "humido">Climas Frios</option>
                <option value = 'quente'>Climas Temperados</option>
                <option value = 'quente'>Climas Quentes</option>
            </select>
            <br></br>

            <p></p>
            </form>
        </div>    
    )
}

export default Formulario