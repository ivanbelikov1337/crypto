import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../Utility/hook";
import styles from "./SpecificItem.module.css"
import {BiRightArrow} from 'react-icons/bi';
import {convertData, convertTime, fixPrice, switherPercent} from "../../../Utility/fix";
import {GoBell} from 'react-icons/go';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';
import {BsShare} from 'react-icons/bs';
import {Link} from "react-router-dom";
import {ROUTES} from "../../../Utility/routes";
import {
    addToFavorite,
    deleteFavorite,
    getSpecificCryptoHistory,
    getSpecificData,
} from "../../../Redux/CryptoApi/cryptoSlice";
import {chartDataLarge, optionsLarge} from "../../../Utility/chart";
import {Line} from "react-chartjs-2";
import {addNewCrypto, deleteInFavorite} from "../../../Redux/User/userSlice";


const SpecificItem: React.FC = () => {
    const {specificHistory, specificData} = useAppSelector((state) => state.crypto)
    const {portfolio} = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const [schedule, setSchedule] = useState("24h")
    const sparkLine = specificHistory.map(res => res.price)
    const timePeriod = specificHistory.map(res => convertTime(res.timestamp))
    const dataPeriod = specificHistory.map(res => convertData(res.timestamp))
    const newArr = [...portfolio]
    const sss = newArr.map(res => res.uuid)
    const temp = sss.find(res => res === specificData.uuid)

    useEffect(() => {
        if (temp === specificData.uuid) {
            dispatch(addToFavorite())
        } else  {
            dispatch(deleteFavorite())
        }
    }, [dispatch, specificData, temp])
    const addToPortfolio = () => {
        dispatch(addToFavorite())
        dispatch(addNewCrypto(specificData))
    }
    const deletePortfolio = () => {
        dispatch(deleteFavorite())
        dispatch(deleteInFavorite(specificData.uuid!))
    }

    const handleChangeGraphic = (values: string | undefined) => {
        switch (values) {
            case "24h":
                return [setSchedule(values), dispatch(getSpecificCryptoHistory([specificData.uuid!, values]))]
            case "7d":
                return [setSchedule(values), dispatch(getSpecificCryptoHistory([specificData.uuid!, values]))]
            case "30d":
                return [setSchedule(values), dispatch(getSpecificCryptoHistory([specificData.uuid!, values]))]
            case "3m":
                return [setSchedule(values), dispatch(getSpecificCryptoHistory([specificData.uuid!, values]))]
            case "1y":
                return [setSchedule(values), dispatch(getSpecificCryptoHistory([specificData.uuid!, values]))]
            case "3y":
                return [setSchedule(values), dispatch(getSpecificCryptoHistory([specificData.uuid!, values]))]
        }
    }

    useEffect(() => {
        dispatch(getSpecificCryptoHistory([specificData.uuid!, "24h"]))
        if (!specificData.name) dispatch(getSpecificData("Qwsogvtv82FCd"))
    }, [specificData, dispatch])

    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <p className={styles.currenci}>
                            <Link className={styles.linkCurrenci} to={ROUTES.DASHBOARD}>Cryptocurrencies</Link>
                            <BiRightArrow/>
                            <span className={styles.currenciName}>{specificData.name}</span>
                    </p>
                    <p className={styles.rank}>Rank #{specificData.rank}</p>
                    <div className={styles.title}>
                        <img className={styles.img} src={specificData.iconUrl} alt={specificData.name}/>
                        <p className={styles.name}>{specificData.name}</p>
                        <p className={styles.symbol}>{specificData.symbol}</p>
                    </div>
                    <div className={styles.prices}>
                        <p className={styles.price}>$ {fixPrice(specificData.price)}</p>
                        <p style={{color: switherPercent(specificData.change!)}}
                               className={styles.change}>{specificData.change} %</p>
                    </div>
                    <div className={styles.options}>
                        <button className={styles.button}><BsShare size={"1.9rem"}/></button>
                        {specificData.favorite ?
                            <button onClick={deletePortfolio} className={styles.button}>
                                <AiFillStar size={"1.9rem"}/>
                            </button> :
                            <button onClick={addToPortfolio} className={styles.button}>
                                <AiOutlineStar size={"1.9rem"}/>
                            </button>
                        }
                        <button className={styles.button}><GoBell size={"1.9rem"}/></button>
                    </div>
                    <div className={styles.priceData}>
                        <p className={styles.priceTitle}>
                                Market Cap
                                <span className={styles.priceTitleNum}>$ {fixPrice(specificData.marketCap)}</span>
                        </p>
                        <p className={styles.priceTitle}>
                                Total Supply
                                <span className={styles.priceTitleNum}> {fixPrice(specificData.supply?.max)}</span>
                        </p>
                        <p className={styles.priceTitle}>
                                Fully Diluted Valuation
                                <span
                                    className={styles.priceTitleNum}>$ {fixPrice(specificData.fullyDilutedMarketCap)}</span>
                        </p>
                        <p className={styles.priceTitle}>
                                Circulating Supply
                                <span
                                    className={styles.priceTitleNum}>{fixPrice(specificData.supply?.circulating)}</span>
                        </p>
                        <p className={styles.priceTitle}>
                                24 Hour Trading Vol
                                <span
                                    className={styles.priceTitleNum}>$ {fixPrice(Object.values(specificData)[11])}</span>
                        </p>
                        <p className={styles.priceTitle}>specificData
                                Max Supply
                                <span className={styles.priceTitleNum}> {fixPrice(specificData.supply?.max)}</span>
                        </p>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <p className={styles.infoTitle}>Info</p>
                    <div className={styles.infoItem}>
                            <p className={styles.infoItemName}>Website</p>
                            <a className={styles.infoLink} target="_blank"
                               href={specificData.links?.["0"] ? specificData.links?.["0"].url : undefined}
                               rel="noreferrer">{specificData.links?.["0"] ? specificData.links?.["0"].name : "---"}</a>
                    </div>
                    <div className={styles.infoItem}>
                            <p className={styles.infoItemName}>Explorers</p>
                            <a className={styles.infoLink} target="_blank"
                               href={specificData.links?.["3"] ? specificData.links?.["3"].url : undefined}
                               rel="noreferrer">{specificData.links?.["3"] ? specificData.links?.["3"].name : "---"}</a>
                    </div>
                    <div className={styles.infoItem}>
                            <p className={styles.infoItemName}>Community</p>
                            <a className={styles.infoLink} target="_blank"
                               href={specificData.links?.["5"] ? specificData.links?.["5"].url : undefined}
                               rel="noreferrer">{specificData.links?.["5"] ? specificData.links?.["5"].name : "---"}</a>
                    </div>
                        <div className={styles.infoItem}>
                            <p className={styles.infoItemName}>Search on</p>
                            <a className={styles.infoLink} target="_blank"
                               href={specificData.links?.["2"] ? specificData.links?.["2"].url : undefined}
                               rel="noreferrer">{specificData.links?.["2"] ? specificData.links?.["2"].name : "---"}</a>
                        </div>
                        <div className={styles.infoItem}>
                            <p className={styles.infoItemName}>API id</p>
                            <a className={styles.infoLink} target="_blank"
                               href={specificData.links?.["4"] ? specificData.links?.["4"].url : undefined}
                               rel="noreferrer">{specificData.links?.["4"] ? specificData.links?.["4"].name : "---"}</a>
                        </div>
                        <div className={styles.infoItem}>
                            <p className={styles.infoItemName}>Tags</p>
                            <a className={styles.infoLink} target="_blank"
                               href={specificData.links?.["8"] ? specificData.links?.["8"].url : undefined}
                               rel="noreferrer">{specificData.links?.["8"] ? specificData.links?.["8"].name : "---"}</a>
                        </div>
                        <p className={styles.cryptoDescription}>{specificData.description}</p>
                    </div>
                </div>
                <div className={styles.schedule}>
                    <p className={styles.scheduleTitle}>{specificData.name} Price Chart ({specificData.symbol})</p>
                    <div className={styles.schedule}>
                        <div className={styles.scheduleSet}>
                            <div className={styles.schedulePrices}>
                                <p className={styles.scheduleOptions}>Price</p>
                            </div>
                            <div className={styles.scheduleTime}>
                                <button onClick={() => handleChangeGraphic("24h")}
                                        className={styles.scheduleOptions}>24h
                                </button>
                                <button onClick={() => handleChangeGraphic("7d")} className={styles.scheduleOptions}>7d
                                </button>
                                <button onClick={() => handleChangeGraphic("30d")}
                                        className={styles.scheduleOptions}>30d
                                </button>
                                <button onClick={() => handleChangeGraphic("3m")} className={styles.scheduleOptions}>3m
                                </button>
                                <button onClick={() => handleChangeGraphic("1y")} className={styles.scheduleOptions}>1y
                                </button>
                            </div>
                        </div>
                        {schedule === "24h" ? <Line data={chartDataLarge(sparkLine!, timePeriod!)}
                                                    options={optionsLarge}/> : null}
                        {schedule === "7d" ? <Line data={chartDataLarge(sparkLine!, dataPeriod!)}
                                                   options={optionsLarge}/> : null}
                        {schedule === "30d" ? <Line data={chartDataLarge(sparkLine!, dataPeriod!)}
                                                    options={optionsLarge}/> : null}
                        {schedule === "3m" ? <Line data={chartDataLarge(sparkLine!, dataPeriod!)}
                                                   options={optionsLarge}/> : null}
                        {schedule === "1y" ? <Line data={chartDataLarge(sparkLine!, dataPeriod!)}
                                                   options={optionsLarge}/> : null}

                    </div>
                </div>
        </section>
    );
}

export default SpecificItem;