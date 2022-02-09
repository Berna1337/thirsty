import React from 'react';
import Formulario from './UserData';
import styles from './Thirsty.module.css'

export default function Account(props) {
    
    localStorage.getItem("token")

    function logout() {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            },
        }).then(res => {
            if (res.status == 200) {
                localStorage.clear()
                props.setLogin(false)
                return 
            }
            return
        })
        .catch(error => console.log(error))
    }
    
    return (
        <div>
            <Formulario {...props}/>
            <button type='button' className={styles.logout} onClick={() => logout()}>Logout</button>
        </div>);
}
