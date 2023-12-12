
interface IRoutes {
    DASHBOARD: string
    PRICE: string
    LOGIN: string
    SPECIFIC_ITEM: string
    PORTFOLIO: string
    NEWS: string
}
export const ROUTES:IRoutes = {
    DASHBOARD: "/",
    PRICE: "/price",
    LOGIN: "/login",
    NEWS: "/news",
    PORTFOLIO: "/portfolio",
    SPECIFIC_ITEM: "/specificItem/:symbol",
}