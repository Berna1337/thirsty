import React, { useState, useEffect } from 'react';
import { ResponsiveTimeRange, ResponsiveCalendar } from '@nivo/calendar'
import styles from './Thirsty.module.css'
import Navbar from './Navbar';

export default function Stats(props) {
    
  const [data, setData] = useState([])
  const [objective, setObjective] = useState(2350)

  useEffect(() => {
    getWaterStats()
    getObjective()
  }, []);

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

  function getWaterStats() {
    fetch('/api/getWaterStats', {
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
      setData(data)
  })
  .catch(error => console.log(error))
  }
    
    return (
        <div>
            <div className={styles.form}>
              <div className={styles.main}>
                <h1 className={styles.title2}>Stats</h1>
                <h2 className={styles.legend}>Últimos 90 dias</h2>
                <div className={styles.stats}>
                  <ResponsiveTimeRange
                    theme={
                      {"axis": {
                        "tooltip": {
                          "container": {
                          "background": "#ffffff",
                          "color": "#144FC6",
                          "fontSize": 12}}
                        }
                      }
                    }
                    data={data}
                    from={new Date(new Date().valueOf() - 86400000 * 90)}
                    to={formatDate(String(new Date(new Date().valueOf() + 86400000)).slice(0, 15))}
                    minValue={0}
                    maxValue={objective}
                    direction='vertical'

                    emptyColor="#eeeeee"
                    colors={[ "#eeeeee", '#00FFFF', '#00EFFF', '#00CBFF', '#00B8FF', '#008CFF' ]}
                    margin={{ top: 0, right: 0, bottom: 80, left: 10 }}
                    dayBorderWidth={2}
                    dayBorderColor="#ffffff"
                    weekdayTicks={[]}
                  />
                </div>
              </div>
            </div>
            <Navbar />
        </div>
    );
}
