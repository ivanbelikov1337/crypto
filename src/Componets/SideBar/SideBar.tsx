import React from 'react';
import styles from "./SideBar.module.css"
import {Link} from "react-router-dom";
import {ROUTES} from "../../Utility/routes";
import Prices from "../../Img/percentage-square.png"
import Portfolio from "../../Img/chart-2protfolio.png"
import News from "../../Img/tradenews.png"
import { BiHomeCircle } from 'react-icons/bi';


const SideBar: React.FC = () => {
    return (
        <aside className={styles.wrapper}>
            <section className={styles.Overview}>
                <p className={styles.title}>OVERVIEW</p>
                <Link className={styles.link} to={ROUTES.DASHBOARD}>
                    <BiHomeCircle size={"2.5rem"} color={"#7a7a7a"}/>
                    <p>Home</p>
                </Link>
                <Link className={styles.link} to={ROUTES.PRICE}>
                    <img src={Prices} className={styles.linkImg} alt=""/>
                    <p>Prices</p>
                </Link>
                <Link className={styles.link} to={ROUTES.PORTFOLIO}>
                    <img src={Portfolio} className={styles.linkImg} alt=""/>
                    <p>Portfolio</p>
                </Link>
                <Link className={styles.link} to={ROUTES.NEWS}>
                    <img src={News} className={styles.linkImg} alt=""/>
                    <p>News</p>
                </Link>
            </section>
        </aside>
    );
}

export default SideBar;