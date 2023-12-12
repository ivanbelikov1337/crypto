import React, {useEffect, useState} from 'react';
import styles from "./Price.module.css"
import {useAppDispatch, useAppSelector} from "../../Utility/hook";
import {ICrypto} from "../../Redux/CryptoApi/ICrypto";
import {AiOutlineStar} from "react-icons/ai";
import {Link} from "react-router-dom";
import {fixPrice, switherPercent} from "../../Utility/fix";
import {getSpecificData} from "../../Redux/CryptoApi/cryptoSlice";
import spinner from "../../Img/blocks-shuffle-3.svg";


const Price: React.FC = () => {
    const {cryptoData, error, status} = useAppSelector(state => state.crypto)
    const dispatch = useAppDispatch()
    const [item, setItem] = useState<ICrypto[]>()
    const [voluSwither, setVoluSwither] = useState(true)
    const [priceSwither, setPriceSwither] = useState(true)
    const [nameSwither, setNameSwither] = useState(true)
    const handleChange = (status: string) => {
        const newArray = [...cryptoData]
        switch (status) {
            case "rate":
                setItem(newArray)
                break
            case "name+":
                setItem(newArray?.sort((a, b) => String(a.symbol?.toLowerCase()) < String(b.symbol?.toLowerCase()) ? 1 : -1))
                setNameSwither(!nameSwither)
                break
            case "name-":
                setItem(newArray?.sort((a, b) => String(a.symbol?.toLowerCase()) > String(b.symbol?.toLowerCase()) ? 1 : -1))
                setNameSwither(!nameSwither)
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
        setItem(cryptoData)
    }, [cryptoData])

    const sendUuid =(uuid:string) => {
        dispatch(getSpecificData(uuid!))
    }
    return (
        <section className={styles.wrapper}>
            <div className={styles.options}>
                <p onClick={() => handleChange("rate")} className={styles.rate}>#</p>
                {nameSwither ? <p onClick={() => handleChange("name+")} className={styles.name}>Name</p> :
                    <p onClick={() => handleChange("name-")} className={styles.name}>Name</p>
                }
                {priceSwither ? <p onClick={() => handleChange("price+")} className={styles.price}>Price</p> :
                    <p onClick={() => handleChange("price-")} className={styles.price}>Price</p>
                }
                {voluSwither ? <p onClick={() => handleChange("volu+")} className={styles.volu}>24h% +</p> :
                    <p onClick={() => handleChange("volu-")} className={styles.volu}>24h% -</p>
                }

                <p className={styles.market}>Market Cap</p>
                <p className={styles.supply}>Circulating Supply</p>
            </div>
            {status === "Loading" ?
                <img className={styles.spinner} src={spinner} alt="spiner"/> : status === "rejected" ?
                    <p className={styles.error}>{error}</p> :
                    <>
                        {item && item.map((res, index) =>
                            <div key={index} className={styles.container}>
                                <p className={styles.containerRate}>
                                    <AiOutlineStar size={18} color={"silver"}/>
                                    {res.rank}
                                </p>
                                <Link onClick={() => sendUuid(res.uuid!)} to={`/specificItem/${res.symbol}`}
                                      className={styles.containerName}>{res.symbol}</Link>
                                <p>${fixPrice(res.price)}</p>
                                <p style={{color: switherPercent(res.change!)}} className={styles.containerVol}>{res.change} </p>
                                <p className={styles.containerMarket}>$ {fixPrice(res.marketCap)}</p>
                                <p>$ {fixPrice(res.marketCap)}</p>
                            </div>)}
                    </>
            }
        </section>
    );
}

export default Price;