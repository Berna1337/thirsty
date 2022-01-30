import React, { useState, useEffect } from 'react';
import { ResponsiveTimeRange, ResponsiveCalendar } from '@nivo/calendar'
import styles from './Thirsty.module.css'
import Navbar from './Navbar';

export default function Stats(props) {
    
  const [data, setData] = useState([])


  let token = props.token

  useEffect(() => {
    getWaterStats()
  
  }, []);

  
  
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
          'Authorization': `${token}`
      }
    }).then(res => {
      // if (res.status == 201) {
      //     setWater(e => e + quant)
      //     return 
      // }
      return res.json()
  })
  .then(data => {
      setData(data)
  })
  .catch(error => console.log(error))
  }

  function getWaterMonth() {
    fetch('/api/getWaterStatsMonth', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
      }
    }).then(res => {
      // if (res.status == 201) {
      //     setWater(e => e + quant)
      //     return 
      // }
      return res.json()
  })
  .then(data => {
      setData(data)
  })
  .catch(error => console.log(error))
  }

  function getWaterYear() {
    fetch('/api/getWaterStatsYear', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
      }
    }).then(res => {
      // if (res.status == 201) {
      //     setWater(e => e + quant)
      //     return 
      // }
      return res.json()
  })
  .then(data => {
      setData(data)
  })
  .catch(error => console.log(error))
  }
// colors={[ '#00FFFF', '#00EFFF', '#00CBFF', '#008CFF' ]}
    
    return (
        <div>
            <div className={styles.form}>
              <div className={styles.main}>
                <div className={styles.stats}>
                  <ResponsiveTimeRange
                    data={data}
                    from={new Date(new Date().valueOf() - 86400000 * 90)}
                    to={formatDate(String(new Date(new Date().valueOf() + 86400000)).slice(0, 15))}
                    direction='vertical'
                    emptyColor="#eeeeee"
                    colors={[ "#eeeeee", '#00FFFF', '#00EFFF', '#00CBFF', '#00A3FF', '#008CFF' ]}
                    margin={{ top: -75, right: 0, bottom: 80, left: 0 }}
                    dayBorderWidth={2}
                    dayBorderColor="#ffffff"
                    weekdayTicks={[]}
                    // legends={[
                    //     {
                    //         anchor: 'right',
                    //         direction: 'column',
                    //         justify: true,
                    //         itemCount: 4,
                    //         itemWidth: 42,
                    //         itemHeight: 36,
                    //         itemsSpacing: 14,
                    //         itemDirection: 'left-to-right',
                    //         translateX: -60,
                    //         translateY: -60,
                    //         symbolSize: 20
                    //     }
                    // ]}
                  />
                </div>
              </div>
            </div>
            <Navbar />
        </div>
    );
}
