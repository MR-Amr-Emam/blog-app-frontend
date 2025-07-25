import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface Miniblogs{
    id: number,
    title: string,
    date: string,
    views: number,
    likes: number,
    description: string,
    image: string,
}

export interface User{
    id: number,
    username: string,
    bio: string,
    date: string,
    backgroundImage: string,
    profileImage: string,
    friendsNumber: number
    friendStatus:number,
    blogsNumber: number,
    miniblogs?: Miniblogs[],
}


const initialUser:User = {
    id: 0,
    username: "",
    bio: "",
    date: "",
    backgroundImage: "",
    profileImage: "",
    blogsNumber: 0,
    friendsNumber: 0,
    friendStatus: 0,
}





export const userSlice = createSlice({
    name: "userslice",
    initialState:initialUser,
    reducers: {
        setUserData:(currentUser, payload:PayloadAction<User>)=>{
            currentUser.id = payload.payload.id;
            currentUser.username = payload.payload.username;
            currentUser.bio = payload.payload.bio;
            currentUser.backgroundImage = payload.payload.backgroundImage;
            currentUser.profileImage = payload.payload.profileImage;
        }
    }
})

export const { setUserData } = userSlice.actions

interface StatesType {
    blogSubmitted: boolean
}

const initialState = {
    blogSubmitted: false,
}

export const StatesSlice = createSlice({
    name: "states",
    initialState,
    reducers: {
        setBlogSubmitted:(state, payload:PayloadAction<boolean>)=>{
            state.blogSubmitted = payload.payload
        }
    }
})

export const { setBlogSubmitted } = StatesSlice.actions