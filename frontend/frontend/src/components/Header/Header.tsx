import React from 'react';
import styles from './Header.module.css'
import {ReactComponent as IconProfile} from '../images/iconProfile.svg'
import {ReactComponent as IconRandom} from '../images/iconrandom2.svg';
import {ReactComponent as IconSetting} from '../images/settings.svg';
import {Link} from "react-router-dom";

export function Header() {

    return <div className={styles.header}>
        <span className={`${styles.study} ${styles.span}`}><Link to="/explore">Изучай</Link></span>
        <span className={`${styles.practice} ${styles.span}`}><Link to="/practice">Практикуйся</Link></span>
        <IconRandom className={styles.random} />
        <IconSetting className={styles.settings} />
        <Link to="/user"><IconProfile className={styles.icon} /></Link>

    </div>

}
