import {useState} from 'react'

export const Formulario = () => {
const [title, setTitle] = useState('')

    return (
        <div>
            <h2></h2>
            <form>
            <label>Nunca viste</label> 
            <input 
                type = "text"
                Required
                value = {title}
                onChange={(e) => setTitle(e.target.value)} 
            />
        
            <label></label>

            <input Required
            
            />
            <textarea Required>

            </textarea>
            <lable></lable>
            <select>
                <option value= "mario">Zgoide</option>
                <option value = 'yoshi'>Zguiri</option>
            </select>
            <button>Add</button>
            <p>{title}</p>
            </form>
        </div>    
    )
}

export default Formulario