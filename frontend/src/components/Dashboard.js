import React, { useState } from 'react';
import styles from './Thirsty.module.css'
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard(props) {
  
  const navigate = useNavigate()
  let token = props.token
  let name = props.name
  console.log(token)

  const [water, setWater] = useState(0)

  function addWater(quant) {
    fetch('/api/submitWater', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({value: quant, date: String(new Date())})
            }).then(res => {
                if (res.status == 201) {
                    setWater(e => e + quant)
                    return 
                }
                return res.json()
            })
            .catch(error => console.log(error))
  }

  function checkProfile() {
    fetch('/api/checkProfile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            }).then(res => {
                if (res.status == 404) {
                    navigate("/profile")
                    console.log("aqui")
                    return
                }
                return res.json()
            })
            .catch(error => console.log(error))
  }

  checkProfile()
  
  return (<div>
    <div className={styles.form}>
      <div className={styles.main}>
        <h1 className={styles.title}>Welcome {name},</h1>

        <h2 className={styles.subtitle}>Objetivo do dia:</h2>
        <div>{water}</div>


        <h2 className={styles.subtitle}>Log your Water!</h2>
        <div className={styles.container}>
          <div className={styles.cup} onClick={() => addWater(250)}>
            <div>
              <span >250ml</span>
            </div>
          </div>
          <div className={styles.cup} onClick={() => addWater(350)}>
            <div>
              <span >350ml</span>
            </div>
          </div>
          <div className={styles.cup} onClick={() => addWater(500)}>
            <div>
              <span >500ml</span>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>);
}
