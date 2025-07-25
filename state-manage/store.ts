import { configureStore } from "@reduxjs/toolkit"
import { userSlice, StatesSlice } from "./user-slice"
import { profilePageSlice } from "./profile-page-slice"
import { blogsSlice } from "./blogs-slice"
import { commentsSlice } from "./commentsslice"

import { setupListeners } from '@reduxjs/toolkit/query'
import { authApiSecure } from "./users-query"
import { BlogsApi } from "./blogs-query"
import { GroupsApi } from "./groups-query"

export const store = configureStore({
    reducer:{
        user: userSlice.reducer,
        states: StatesSlice.reducer,
        profilePage: profilePageSlice.reducer,
        blogs: blogsSlice.reducer,
        comments: commentsSlice.reducer,
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
        .concat(authApiSecure.middleware)
        .concat(BlogsApi.middleware)
        .concat(GroupsApi.middleware)
    }
})

setupListeners(store.dispatch);