import React from 'react';
import styles from "./Footer.module.css"
import img from "../../Img/git.png"

const Footer: React.FC = () => {
    return (
        <section className={styles.wrapper}>
            <p className={styles.title}>Crypto Info ©. All rights reserved.</p>
            <div className={styles.info}>
                <p> Developer by Belikov Ivan</p>|
                <div className={styles.social}>
                    <a target="_blank" href="https://github.com/ivanbelikov1337" rel="noreferrer">
                        <img className={styles.icon} width={25} height={25} src={img} alt="github.com"/>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Footer;