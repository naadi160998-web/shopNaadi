import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../features/productSlice"
import productImageReducer from "../features/productImageSlice"

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

const rootReducer = combineReducers({
    products:productsReducer,
    productImages:productImageReducer
})

const persistConfig = {
    key:"root",
    storage,
    whiteList:["products","productImages"]
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