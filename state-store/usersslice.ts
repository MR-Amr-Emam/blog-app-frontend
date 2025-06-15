import { createSlice } from "@reduxjs/toolkit";

interface Miniblogs{
    id: number,
    title: string,
    date: string,
    views: number,
    likes: number,
    description: string,
    image: string,
}

interface User{
    username: string,
    miniblogs: Miniblogs[],
}


const initialState:User[] = [
    {
        username: "amr emam",
        miniblogs:[
            {id:1, title:"that is title", date:"15 jan 2023", views:23, likes:23, description: "that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"},
            {id:2, title:"that is title", date:"15 jan 2023", views:23, likes:23, description: "that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"},
            {id:3, title:"that is title", date:"15 jan 2023", views:23, likes:23, description: "that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"},
            {id:4, title:"that is title", date:"15 jan 2023", views:23, likes:23, description: "that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"},
            {id:5, title:"that is title", date:"15 jan 2023", views:23, likes:23, description: "that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"},
            {id:6, title:"that is title", date:"15 jan 2023", views:23, likes:23, description: "that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"},
            {id:7, title:"that is title", date:"15 jan 2023", views:23, likes:23, description: "that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"},
        ]
    }
]


export const usersSlice = createSlice({
    name: "minipostSlice",
    initialState,
    reducers: {

    }
})