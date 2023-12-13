import React from 'react';
import {Route, Routes} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import {ROUTES} from "../../Utility/routes";
import Login from "../Login/Login";
import SpecificItem from "../CryptoItem/SpecificItem/SpecificItem";
import Price from "../Price/Price";
import News from "../News/News";
import Portfolio from "../Portfolio/Portfolio";


const AppRoutes = () => {
    return (
        <main>
            <Routes>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard/>}/>
                <Route path={ROUTES.PRICE} element={<Price/>}/>
                <Route path={ROUTES.LOGIN} element={<Login/>}/>
                <Route path={ROUTES.PORTFOLIO} element={<Portfolio/>}/>
                <Route path={ROUTES.NEWS} element={<News/>}/>
                <Route path={ROUTES.SPECIFIC_ITEM} element={<SpecificItem/>}/>
            </Routes>
        </main>
    );
}

export default AppRoutes;