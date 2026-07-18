import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../features/productSlice"
import productImageReducer from "../features/productImageSlice"
import warehousesReducer from "../features/warehousesSlice"
import stockReducer from "../features/stockSlice"
import orderReducer from "../features/orderSlice"
import brandReducer from "../features/brandSlice"
import customerReducer from "../features/customerSlice"

import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage"
import { combineReducers } from "@reduxjs/toolkit";
import Warehouses from "../pages/Warehouses";

const rootReducer = combineReducers({
    products:productsReducer,
    productImages:productImageReducer,
    warehouses: warehousesReducer,
    stocks:stockReducer,
    orders:orderReducer,
    brands:brandReducer,
    customers:customerReducer
})

const persistConfig = {
    key:"root",
    storage,
    whiteList:["products","productImages","warehouses","stocks","brands","customers"]
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions:[
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        })
})

export const persistor = persistStore(store)