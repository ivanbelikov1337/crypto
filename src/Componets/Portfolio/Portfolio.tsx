import React, {useEffect, useState} from 'react';
import styles from "./Portfolio.module.css"
import { useAppSelector} from "../../Utility/hook";
import {ICrypto} from "../../Redux/CryptoApi/ICrypto";
import PriceItem from "../Price/PriceItem/PriceItem";
const Portfolio: React.FC = () => {
    const {portfolio} = useAppSelector(state => state.user)
    const [item, setItem] = useState<ICrypto[]>()
    const [voluSwither, setVoluSwither] = useState(true)
    const [priceSwither, setPriceSwither] = useState(true)

    const handleChange = (status: string) => {
        const newArray = [...portfolio]
        switch (status) {
            case "rate":
                setItem(newArray)
                break
            case "price+":
                setItem(newArray?.sort((a, b) => Number(a.price) < Number(b.price) ? 1 : -1))
                setPriceSwither(!priceSwither)
                break
            case "price-":
                setItem(newArray?.sort((a, b) => Number(a.price) > Number(b.price) ? 1 : -1))
                setPriceSwither(!priceSwither)
                break
            case "volu+":
                setItem(newArray?.sort((a, b) => Number(a.change) < Number(b.change) ? 1 : -1))
                setVoluSwither(!voluSwither)
                break
            case "volu-":
                setItem(newArray?.sort((a, b) => Number(a.change) > Number(b.change) ? 1 : -1))
                setVoluSwither(!voluSwither)
                break

        }
    }

    useEffect(() => {
        setItem(portfolio)
    }, [portfolio])


    return (
        <section className={styles.wrapper}>
            <div className={styles.options}>
                <p onClick={() => handleChange("rate")} className={styles.rate}>#</p>
                <p className={styles.name}>Name</p>
                {priceSwither ? <p onClick={() => handleChange("price+")} className={styles.price}>Price</p> :
                    <p onClick={() => handleChange("price-")} className={styles.price}>Price</p>
                }
                {voluSwither ? <p onClick={() => handleChange("volu+")} className={styles.volu}>24h% +</p> :
                    <p onClick={() => handleChange("volu-")} className={styles.volu}>24h% -</p>
                }

                <p className={styles.market}>Market Cap</p>
                <p className={styles.supply}>Circulating Supply</p>
            </div>
            {item && item.map((res, index) => <PriceItem key={index} items={res}/>)}
        </section>
    );
}

export default Portfolio;

