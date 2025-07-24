import { configureStore } from "@reduxjs/toolkit"
import { userSlice } from "./users-slice"
import { profilePageSlice } from "./profile-page-slice"
import { blogsSlice } from "./blogs-slice"
import { commentsSlice } from "./commentsslice"

import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi, authApiSecure } from "./users-query"
import { BlogsApi } from "./blogs-query"
import { GroupsApi } from "./groups-query"

export const store = configureStore({
    reducer:{
        user: userSlice.reducer,
        profilePage: profilePageSlice.reducer,
        blogs: blogsSlice.reducer,
        comments: commentsSlice.reducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
        [authApiSecure.reducerPath]: authApiSecure.reducer,
        [BlogsApi.reducerPath]: BlogsApi.reducer,
        [GroupsApi.reducerPath]: GroupsApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>{return getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:[
                'authapisecure/executeMutation/pending',
                'authapisecure/executeMutation/fulfilled',
                'authapisecure/executeMutation/rejected',
            ]
        },
        ignoredPaths: ['meta.arg', 'meta.arg.originalArgs', 'payload'],
    })
        .concat(pokemonApi.middleware)
        .concat(authApiSecure.middleware)
        .concat(BlogsApi.middleware)
        .concat(GroupsApi.middleware)
    }
})

setupListeners(store.dispatch);