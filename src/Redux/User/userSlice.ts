import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "./IUser";
import {ICrypto} from "../CryptoApi/ICrypto";


const initialState: IUser = {
    dataUser: {},
    isAuth: false,
    portfolio: []
}
export const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        addNewCrypto: (state, action: PayloadAction<ICrypto>) => {
            let newCart = [...state.portfolio]
            const found = state.portfolio.find(({uuid}) => uuid === action.payload.uuid)
            if (found) {
                newCart = newCart.map((item) => {
                    return item.uuid === action.payload.uuid ? item : item
                })
            } else {
                newCart.push({...action.payload})
            }
            state.portfolio = newCart
        },
        deleteInFavorite: (state, action) => {
            state.portfolio = state.portfolio.filter(({uuid}) => uuid !== action.payload)
        }
    }
})

export const {addNewCrypto, deleteInFavorite} = userSlice.actions