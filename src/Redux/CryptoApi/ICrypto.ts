export interface ISupply {
    circulating?: string
    max?: string
    total?: string
}

export interface IAllTimeHigh {
    price?: string
    timestamp?: string
}
export interface ILinksItems {
    name?: string
    type?: string
    url?: string
}
export interface IGlobalStats {
    btcDominance?: number
    totalCoins?: number
    totalExchanges?: number
}
export interface ILinks {
    0: ILinksItems
    1: ILinksItems
    2: ILinksItems
    3: ILinksItems
    4: ILinksItems
    5: ILinksItems
    6: ILinksItems
    7: ILinksItems
    8: ILinksItems
    9: ILinksItems
    10: ILinksItems
}

export interface ICrypto {
    symbol?: string
    iconUrl?: string
    description?: string
    marketCap?: string
    price?: number | undefined
    btcPrice?: string
    change?: number
    sparkline?: string[]
    coinrankingUrl?: string
    listedAt?: number
    lowVolume?: boolean
    name?: string
    rank?: number
    uuid?: string
    favorite?: boolean
    fullyDilutedMarketCap? : string
    allTimeHigh?: IAllTimeHigh
    supply?: ISupply
    links?:ILinks
}

interface INewsSours {
    id: string
    name: string
}
export interface INewsData {
    author: string | null
    content: string
    description: string
    publishedAt: string
    url: string
    urlToImage: string
    title: string
    source: INewsSours
}
export interface IHistory {
    price?: string
    timestamp?: number | undefined
}


export interface CryptoState {
    cryptoData: ICrypto[]
    specificData: ICrypto
    specificDataCopy: ICrypto
    specificHistory: IHistory[]
    globalStats: IGlobalStats
    newsData: INewsData[]
    error: string
    status: string
}
