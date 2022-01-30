import React from 'react';
import Formulario from './UserData';
import styles from './Thirsty.module.css'

export default function Account(props) {
    
    let token = props.token

    function logout() {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        }).then(res => {
            if (res.status == 200) {
                localStorage.clear()
                return 
            }
            return
        })
        .catch(error => console.log(error))
    }
    
    return (
        <div>
            <Formulario token={token}/>
            <button type='button' className={styles.logout} onClick={() => logout()}>Logout</button>
        </div>);
}
