import { configureStore } from "@reduxjs/toolkit"
import { usersSlice } from "./usersslice"
import { blogsSlice } from "./blogsslice"
import { commentsSlice } from "./commentsslice"

import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from "./rtk-test"

export const store = configureStore({
    reducer:{
        users: usersSlice.reducer,
        blogs: blogsSlice.reducer,
        comments: commentsSlice.reducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>{return getDefaultMiddleware().concat(pokemonApi.middleware)}
})

setupListeners(store.dispatch);