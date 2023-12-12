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
        <section className={styles.wrapper}>
            <div className={styles.Overview}>
                <p className={styles.title}>OVERVIEW</p>
                <Link className={styles.link} to={ROUTES.DASHBOARD}>
                    <BiHomeCircle size={25} color={"#7a7a7a"}/>
                    <p>Home</p>
                </Link>
                <Link className={styles.link} to={ROUTES.PRICE}>
                    <img src={Prices} alt=""/>
                    <p>Prices</p>
                </Link>
                <Link className={styles.link} to={ROUTES.PORTFOLIO}>
                    <img src={Portfolio} alt=""/>
                    <p>Portfolio</p>
                </Link>
                <Link className={styles.link} to={ROUTES.NEWS}>
                    <img src={News} alt=""/>
                    <p>News</p>
                </Link>
            </div>

        </section>
    );
}

export default SideBar;