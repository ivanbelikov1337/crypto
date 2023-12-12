export interface IItems  {
    symbol?: string
    iconUrl?: string
    marketCap?: string | undefined
    price?: number | undefined
    btcPrice?: string
    change?: number
    sparkline?: string[] | undefined
    coinrankingUrl?: string
    listedAt?: number
    lowVolume?: boolean
    name?: string
    rank?: number
    amount?: number
    uuid?: string
}

export interface Crypto  {
    items: IItems
}