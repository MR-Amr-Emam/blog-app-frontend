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
    backgroundImage: string,
    profileImage: string,
    friendsNumber: number
    friendStatus:number,
    blogsNumber: number,
    miniblogs?: Miniblogs[],
}


const initialState:User = {
    id: 0,
    username: "",
    bio: "",
    backgroundImage: "",
    profileImage: "",
    blogsNumber: 0,
    miniblogs: [
        {id:1, title:"that is title", date:"15 jan 2023", views:23, likes:23, description: "that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"},
        {id:2, title:"that is title", date:"15 jan 2023", views:23, likes:23, description: "that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"},
        {id:3, title:"that is title", date:"15 jan 2023", views:23, likes:23, description: "that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"},
        {id:4, title:"that is title", date:"15 jan 2023", views:23, likes:23, description: "that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"},
        {id:5, title:"that is title", date:"15 jan 2023", views:23, likes:23, description: "that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"},
        {id:6, title:"that is title", date:"15 jan 2023", views:23, likes:23, description: "that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"},
        {id:7, title:"that is title", date:"15 jan 2023", views:23, likes:23, description: "that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"},
    ],
    friendsNumber: 0,
    friendStatus: 0,
}





export const userSlice = createSlice({
    name: "userslice",
    initialState,
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