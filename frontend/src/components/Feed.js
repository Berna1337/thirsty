import React, { useState, useEffect } from 'react';
import styles from './Thirsty.module.css'
import Navbar from './Navbar';


export default function Feed() {

    
    return (
        <div>
            <div className={styles.form}>
                <div className={styles.main}>
                <h1 className={styles.title2}>Feed</h1>
                <h2 className={styles.legend}>Share your healthy habits</h2>
                <div className={styles.stats}>

                </div>
            </div>
            </div>
            <Navbar />
        </div>
    )
}
