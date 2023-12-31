import React, {useEffect, useState} from 'react';
import styles from "./Header.module.css"
import {AiOutlineSearch} from 'react-icons/ai';
import {Link} from "react-router-dom";
import {ROUTES} from "../../Utility/routes";
import logo from "../../Img/Vector.png"
import dollar from "../../Img/dollar-circledolar.png"
import notification from "../../Img/notification.png"
import {useAppDispatch, useAppSelector} from "../../Utility/hook";
import {TiDelete} from 'react-icons/ti';
import {fixPrice} from "../../Utility/fix";
import {getSpecificData} from "../../Redux/CryptoApi/cryptoSlice";


const Header: React.FC = () => {
    const {cryptoData, globalStats} = useAppSelector(state => state.crypto)
    const [value, setValue] = useState("")
    const [swicher, setSwicher] = useState(false)
    const dispatch = useAppDispatch()

    const sendUuid = (uuid: string | undefined) => {
        dispatch(getSpecificData(uuid!))
        setSwicher(false)
        setValue("")
    }
    const filterCrypto = cryptoData.filter(crypto => {
        return crypto.name?.toLowerCase().includes(value.toLowerCase()) || crypto.symbol?.toLowerCase().includes(value.toLowerCase())
    })

    useEffect(() => {
        if (value.length > 0) setSwicher(true)
    }, [value])
    return (
        <header className={styles.wrapper}>
            <Link className={styles.logo} to={ROUTES.DASHBOARD}>
                <img src={logo} className={styles.logImg} alt="logo"/>
                <h1 className={styles.titleLogo}>Crypto Info</h1>
            </Link>
            <form className={styles.search}>
                <AiOutlineSearch color={"silver"} size={"2rem"}/>
                <input onChange={(e) => setValue(e.target.value)}
                       className={styles.input}
                       value={value}
                       onClick={() => setSwicher(!swicher)}
                       placeholder={"Search"}
                       autoComplete="off"
                       type="text"
                />
                {swicher && (
                    <div className={styles.searchContainer}>
                        <div className={styles.searchBox}>
                            {filterCrypto.length === 0 ?
                                <p className={styles.noResult}>No result</p> : filterCrypto.map((res, index) =>
                                    <Link onClick={() => sendUuid(res.uuid)} to={`/specificItem/${res.symbol}`} key={index}
                                          className={styles.searchBoxItem}>
                                        <img className={styles.img} src={res.iconUrl} alt={res.symbol}/>
                                        <p className={styles.name}>{res.name}</p>
                                        <p>({res.symbol})</p>
                                        <div className={styles.rank}>
                                            <p>#{res.rank}</p>
                                        </div>
                                    </Link>
                                )}
                        </div>
                        <div className={styles.abolition}>
                            <TiDelete size={"2.5rem"} color={"silver"} onClick={() => setSwicher(!swicher)}/>
                        </div>
                    </div>
                )}
            </form>
            <div className={styles.cryptoInfo}>
                <p>Cryptos: <span className={styles.cryptoInfoT}>{globalStats.totalCoins}</span></p>
                <p>Exchanges: <span className={styles.cryptoInfoT}>{globalStats.totalExchanges}</span></p>
                <p>BTC Dominance: <span className={styles.cryptoInfoT}>{fixPrice(globalStats.btcDominance)}%</span></p>
            </div>
            <div className={styles.setFiat}>
                <div className={styles.select}>
                    <img src={dollar} className={styles.dollarImg} alt="dollar"/>
                    <p>USD</p>
                </div>
                <div className={styles.notification}>
                    <img src={notification} className={styles.notificationImg} alt="notification"/>
                </div>
            </div>
            <div className={styles.user}>
            </div>
        </header>
    );
}

export default Header;