import React from 'react';
import styles from './Thirsty.module.css'
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  return (
    <div valgin="bottom" className={styles.navtab}>
        <span className="material-icons" >
            <Link to="/dashboard" className={styles.nodecor}>home</Link>
        </span>
        <span className="material-icons" >
            <Link to="/stats" className={styles.nodecor}>leaderboard</Link>
        </span>
        <span className="material-icons" >
            <Link to="/account" className={styles.nodecor}>account_circle</Link>
        </span>
    </div>);
}
