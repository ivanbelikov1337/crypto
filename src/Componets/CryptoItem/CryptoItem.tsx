import React from 'react';
import styles from "./CryptoItem.module.css"
import {AiOutlineStar} from 'react-icons/ai';
import {Line} from "react-chartjs-2"
import { fixPrice, switherPercent} from "../../Utility/fix";
import {chartData, options} from "../../Utility/chart";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../Utility/hook";
import {Crypto} from "./ICryptoItem";
import {getSpecificData} from "../../Redux/CryptoApi/cryptoSlice";




const CryptoItem: React.FC<Crypto> = ({items: {iconUrl, uuid,change, sparkline, price, symbol, rank}}) => {
    const dispatch = useAppDispatch()
    const sendUuid =() => {
        dispatch(getSpecificData(uuid!))
    }

    return (
        <Link onClick={sendUuid} to={`/specificItem/${symbol}`} className={styles.wrapper}>
            <div className={styles.title}>
                <img className={styles.img} src={iconUrl} alt="img"/>
                <p>{symbol}</p>
            </div>
            <Line  data={chartData(sparkline!)} options={options}/>
            <p>{fixPrice(price!)}$</p>
            <div className={styles.info}>
                <p style={{color: switherPercent(change!)}}>{change}%</p>
                <p className={styles.rank}>
                    <AiOutlineStar size={18} color={"silver"}/>
                    {rank}
                </p>
            </div>
        </Link>
    );
}

export default CryptoItem;