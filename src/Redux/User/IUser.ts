import {ICrypto} from "../CryptoApi/ICrypto";

interface IDataUser {
    name?: string
    img?: string
    email?: string
}

export interface IUser {
    dataUser: IDataUser
    isAuth: boolean
    portfolio: ICrypto[]
}