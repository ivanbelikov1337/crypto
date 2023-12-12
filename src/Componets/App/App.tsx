import React, {useEffect} from 'react';
import {useAppDispatch } from "../../Utility/hook";
import {getCryptoData, getGlobalStats} from "../../Redux/CryptoApi/cryptoSlice";
import styles from "./App.module.css"
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import AppRoutes from "../Routes/Routes";
import Footer from "../Footer/Footer";


const App:React.FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getCryptoData())
        dispatch(getGlobalStats())
    }, [dispatch]);

    return (
        <section className={styles.wrapper}>
            <Header/>
            <div className={styles.container}>
                <SideBar/>
                <AppRoutes/>
            </div>
            <Footer/>
        </section>
    );
}

export default App;
