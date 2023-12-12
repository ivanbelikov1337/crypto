import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {apiKey, baseUrl} from "../../Utility/apiUrl";
import {CryptoState, ICrypto, IGlobalStats, IHistory, INewsData,} from "./ICrypto";


const initialState: CryptoState = {
    specificDataCopy: {},
    specificHistory: [],
    specificData: {},
    globalStats: {},
    cryptoData: [],
    newsData: [],
    status: "",
    error: "",
}

export const getCryptoData = createAsyncThunk<ICrypto[]>(
    "crypto/getCryptoData",
    async (_, {rejectWithValue}) => {
        const options = {
            "headers": {'x-access-token': apiKey}
        };
        try {
            const res = await axios.get(`${baseUrl}coins?limit=100`, options)
            return res.data.data.coins as ICrypto[]
        } catch ({message}) {
            return rejectWithValue(message)
        }
    }
)

export const getSpecificData = createAsyncThunk<ICrypto, string>(
    "crypto/getSpecificData",
    async (uuid, {rejectWithValue}) => {
        const options = {
            "headers": {'x-access-token': apiKey}
        };
        try {
            const res = await axios.get(`${baseUrl}coin/${uuid}`, options)
            return res.data.data.coin as ICrypto
        } catch ({message}) {
            return rejectWithValue(message)
        }
    }
)


export const getSpecificCryptoHistory = createAsyncThunk<IHistory[], string[]>(
    "crypto/getSpecificCryptoHistory",
    async ([uuid, period], {rejectWithValue}) => {
        const options = {
            "headers": {'x-access-token': apiKey}
        };
        try {
            const res = await axios.get(`${baseUrl}coin/${uuid}/history?timePeriod=${period}`, options)
            return res.data.data.history as IHistory[]
        } catch ({message}) {
            return rejectWithValue(message)
        }
    }
)
export const getGlobalStats = createAsyncThunk<IGlobalStats>(
    "crypto/getGlobalStats",
    async (_, {rejectWithValue}) => {
        const options = {
            "headers": {'x-access-token': apiKey}
        };
        try {
            const res = await axios.get(`${baseUrl}stats`, options)
            return res.data.data as IGlobalStats
        } catch ({message}) {
            return rejectWithValue(message)
        }
    }
)
export const getCryptoNews = createAsyncThunk<INewsData[]>(
    "crypto/getCryptoNews",
    async (_, {rejectWithValue}) => {
        try {
            const res = await axios.get(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=9f40fa5e2f934f48b995c0b885ce2a14`)
            return res.data.articles as INewsData[]
        } catch ({message}) {
            return rejectWithValue(message)
        }
    }
)

export const cryptoSlice = createSlice({
    name: "crypto",
    initialState,
    reducers: {
        addToFavorite: (state) => {
            state.specificData.favorite = true
        },
        deleteFavorite: (state) => {
            state.specificData.favorite = false
        }
    },
    extraReducers: builder => {
        builder.addCase(getCryptoData.pending, (state) => {
            state.status = "Loading"
            state.error = ""
        })
        builder.addCase(getCryptoData.fulfilled, (state, action: PayloadAction<ICrypto[]>) => {
            state.cryptoData = action.payload
            state.status = "resolved"
        })
        builder.addCase(getCryptoData.rejected, (state, action) => {
            state.error = action.payload as string
            state.status = "rejected"
        })
        builder.addCase(getSpecificCryptoHistory.pending, (state) => {
            state.status = "Loading"
            state.error = ""
        })
        builder.addCase(getSpecificCryptoHistory.fulfilled, (state, action: PayloadAction<IHistory[]>) => {
            state.specificHistory = action.payload
            state.status = "resolved"
        })
        builder.addCase(getSpecificCryptoHistory.rejected, (state, action) => {
            state.error = action.payload as string
            state.status = "rejected"
        })
        builder.addCase(getSpecificData.pending, (state) => {
            state.status = "Loading"
            state.error = ""
        })
        builder.addCase(getSpecificData.fulfilled, (state, action: PayloadAction<ICrypto>) => {
            state.specificData = action.payload
            state.status = "resolved"
        })
        builder.addCase(getSpecificData.rejected, (state, action) => {
            state.error = action.payload as string
            state.status = "rejected"
        })
        builder.addCase(getGlobalStats.pending, (state) => {
            state.status = "Loading"
            state.error = ""
        })
        builder.addCase(getGlobalStats.fulfilled, (state, action: PayloadAction<IGlobalStats>) => {
            state.globalStats = action.payload
            state.status = "resolved"
        })
        builder.addCase(getGlobalStats.rejected, (state, action) => {
            state.error = action.payload as string
            state.status = "rejected"
        })
        builder.addCase(getCryptoNews.pending, (state) => {
            state.status = "Loading"
            state.error = ""
        })
        builder.addCase(getCryptoNews.fulfilled, (state, action: PayloadAction<INewsData[]>) => {
            state.newsData = action.payload
            state.status = "resolved"
        })
        builder.addCase(getCryptoNews.rejected, (state, action) => {
            state.error = action.payload as string
            state.status = "rejected"
        })
    }
})

export const {addToFavorite, deleteFavorite} = cryptoSlice.actions

