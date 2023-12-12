import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {cryptoSlice} from "./CryptoApi/cryptoSlice";
import {userSlice} from "./User/userSlice";

export const rootReducer = combineReducers({
    crypto: cryptoSlice.reducer,
    user: userSlice.reducer
})

export const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    }
)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;