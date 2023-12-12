import React, {useState} from 'react';
import styles from "./Dashboard.module.css"
import {useAppSelector} from "../../Utility/hook";
import CryptoItem from "../CryptoItem/CryptoItem";
import spinner from "../../Img/blocks-shuffle-3.svg"

const Dashboard: React.FC = () => {
    const {cryptoData, status, error} = useAppSelector(state => state.crypto)
    const [amount, setAmount] = useState(9)
    const list = cryptoData.filter((_, i) => i < amount)

    return (
        <section className={styles.wrapper}>
            <h1 className={styles.title}>Cryptocurrency Prices by Crypto Info</h1>
            <div className={styles.box}>
                {status === "Loading" ?
                    <img className={styles.spinner} src={spinner} alt="spiner"/> : status === "rejected" ?
                        <p className={styles.error}>{error}</p> :
                        <>
                            <div className={styles.container}>
                                {list.map((res, index) => <CryptoItem items={res} key={index}/>)}
                            </div>
                            <div className={styles.showMore}>
                                {list.length >= amount ?
                                    <button className={styles.button} onClick={() => setAmount(amount + 6)}>Show
                                        More</button>
                                    : null
                                }
                            </div>
                        </>
                }
            </div>
        </section>
    );
}

export default Dashboard;