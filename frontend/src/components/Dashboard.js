import React, { useState, useEffect } from 'react';
import styles from './Thirsty.module.css'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import bottle from "../bottle.png"

export default function Dashboard(props) {
  
  const navigate = useNavigate()

  const [water, setWater] = useState(0)
  const [name, setName] = useState("")
  const [objective, setObjective] = useState(2350)

  function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  function addWater(quant) {
    fetch('/api/submitWater', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem("token")}`
                },
                body: JSON.stringify({value: quant, day: formatDate(String(new Date()).slice(0, 15))})
            }).then(res => {
                if (res.status == 201) {
                    setWater(e => e + quant)
                    return 
                }
                if (res.status == 403) {
                    props.setLogin(false)
                    return
                }
                return res.json()
            })
            .catch(error => console.log(error))
  }

  function addWaterDay(quant) {
    fetch('/api/submitWaterDay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem("token")}`
                },
                body: JSON.stringify({value: quant, day: formatDate(String(new Date()).slice(0, 15))})
            }).then(res => {
              if (res.status == 403) {
                props.setLogin(false)
                return
              }  
              return
            })
            .catch(error => console.log(error))
  }

  function getName() {
    fetch('/api/name', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem("token")}`
                }
            }).then(res => {
                if (res.status == 403) {
                    props.setLogin(false)
                    return
                }
                return res.json()
            })
            .then(data => {  
              setName(data)
            })
            .catch(error => console.log(error))
  }

  function getObjective() {
    fetch('/api/objective', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem("token")}`
                }
            }).then(res => {
                if (res.status == 403) {
                    props.setLogin(false)
                    return
                }
                return res.json()
            })
            .then(data => {  
              setObjective(data)
            })
            .catch(error => console.log(error))
  }

  function getWater() {
    fetch('/api/getWater', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem("token")}`
                }
            }).then(res => {
                if (res.status == 403) {
                    props.setLogin(false)
                    return
                }
                return res.json()
            })
            .then(data => {
                setWater(data)
            })
            .catch(error => console.log(error))
  }

  function checkProfile() {
    fetch('/api/checkProfile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem("token")}`
                }
            }).then(res => {
                if (res.status == 404) {
                    navigate("/profile")
                    return
                }
                if (res.status == 403) {
                    props.setLogin(false)
                    return
                }
                getName()
                getObjective()
                getWater()
                return
            })
            .catch(error => console.log(error))
  }


  useEffect(() => {
    checkProfile()
    if (water > 0) addWaterDay(water)
    
    
  }, [water]);
  
  
  
  return (<div>
    <div className={styles.form}>
      <div className={styles.main}>
        <h1 className={styles.title}>Welcome {name},</h1>

        <h2 className={styles.subtitle}>Objetivo do dia:</h2>
        <div className={styles.field}>{water}ml / {objective}ml</div>


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
        <Navbar />
      </div>
    </div>
  </div>);
}
