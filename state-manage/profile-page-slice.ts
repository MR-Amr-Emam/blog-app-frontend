import { User } from "./user-slice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/query";

interface ProfilePageType{
    sideMenuSelect: string,
    refetch: boolean,
}


export const profilePageSlice = createSlice({
    name: "profilepageslice",
    initialState: {sideMenuSelect:"menu", refetch:false},
    reducers: {
        setSideMenuSelect:(state, payload:PayloadAction<string>)=>{
            state.sideMenuSelect=payload.payload
        },
        setRefetch:(state, payload:PayloadAction<boolean>)=>{
            state.refetch=payload.payload
        },
    }
})

export const { setSideMenuSelect, setRefetch } = profilePageSlice.actions