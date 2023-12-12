import React, {useEffect} from 'react';
import styles from "./News.module.css"
import {useAppDispatch, useAppSelector} from "../../Utility/hook";
import CryptoItem from "../CryptoItem/CryptoItem";
import {getCryptoNews} from "../../Redux/CryptoApi/cryptoSlice";
import btcImage from "../../Img/cryptoNews.jpg"
import spinner from "../../Img/blocks-shuffle-3.svg";


const News: React.FC = () => {
    const dispatch = useAppDispatch()
    const {cryptoData, newsData, status, error} = useAppSelector(state => state.crypto)
    const newArr = [...cryptoData]
    const theBastChange = newArr.sort((a, b) => Number(a.change) < Number(b.change) ? 1 : -1).splice(0, 3)
    const worstChange = newArr.sort((a, b) => Number(a.change) > Number(b.change) ? 1 : -1).splice(0, 3)
    const tempArr = [...newsData]
    const randomArrNews = tempArr.sort(() => Math.random() - 0.6).splice(0, 6)


    useEffect(() => {
        dispatch(getCryptoNews())
    }, [dispatch])
    return (
        <section className={styles.wrapper}>
            <h1 className={styles.title}>Crypto News</h1>
            {status === "Loading" ?
                <img className={styles.spinner} src={spinner} alt="spiner"/> : status === "rejected" ?
                    <p className={styles.error}>{error}</p> :
                    <div className={styles.container}>
                        {randomArrNews.map((res, index) =>
                            <div key={index} className={styles.newsContainer}>
                                <a className={styles.link} target="_blank" href={res.url}
                                   rel="noreferrer">{res.title}</a>
                                <img className={styles.img} src={res.urlToImage || btcImage} alt={"mews"}/>
                                <p className={styles.description}>{res.description}</p>
                            </div>)}
                    </div>
            }
            {status === "Loading" ?
                <img className={styles.spinner} src={spinner} alt="spiner"/> : status === "rejected" ?
                    <p className={styles.error}>{error}</p> :
                    <>
                        <div>
                            <p className={styles.title}>The Bast Change by 24h</p>
                            <div className={styles.itemContainer}>
                                {theBastChange.map((res, index) => <CryptoItem key={index} items={res}/>)}
                            </div>
                        </div>
                        <div>
                            <p className={styles.title}>Worst Change by 24h</p>
                            <div className={styles.itemContainer}>
                                {worstChange.map((res, index) => <CryptoItem key={index} items={res}/>)}
                            </div>
                        </div>
                    </>
            }
        </section>
    );
}

export default News;
