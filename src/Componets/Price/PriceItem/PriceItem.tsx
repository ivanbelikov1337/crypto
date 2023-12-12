import React from 'react';
import styles from "../../Portfolio/Portfolio.module.css";
import {AiOutlineStar} from "react-icons/ai";
import {AiTwotoneDelete} from "react-icons/ai";
import {Link} from "react-router-dom";
import {fixPrice, switherPercent} from "../../../Utility/fix";
import {Crypto} from "../../CryptoItem/ICryptoItem";
import {useAppDispatch} from "../../../Utility/hook";
import {deleteInFavorite} from "../../../Redux/User/userSlice";
import {getSpecificData} from "../../../Redux/CryptoApi/cryptoSlice";



const PriceItem: React.FC<Crypto> = ({items:{rank,symbol,change,price,marketCap,uuid}}) => {
    const dispatch = useAppDispatch()
    const sendUuid =() => {
        dispatch(getSpecificData(uuid!))
    }


    return (
        <div  className={styles.container}>
            <p className={styles.containerRate}>
                <AiOutlineStar size={18} color={"silver"}/>
                {rank}
            </p>
            <Link onClick={sendUuid} to={`/specificItem/${symbol}`}
                  className={styles.containerName}>{symbol}</Link>
            <p>${fixPrice(price)}</p>
            <p style={{color: switherPercent(change!)}} className={styles.containerVol}>{change} </p>
            <p className={styles.containerMarket}>$ {fixPrice(marketCap)}</p>
            <p>$ {fixPrice(marketCap)}</p>
            <AiTwotoneDelete onClick={() => dispatch(deleteInFavorite(uuid))} style={{cursor: "pointer"}} size={18} color={"silver"}/>
        </div>
    );
}

export default PriceItem;