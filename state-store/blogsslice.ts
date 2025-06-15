import { createSlice } from "@reduxjs/toolkit";

interface Blog{
    username:string,
    id:number,
    date:string,
    views:number,
    likes:number,
    title:string,
    image:string,
    description:string,
    sections:{image:string, paragraph:string}[]
}


const initialState:Blog[] = [
    {
        username: "amr emam",
        id:1,
        date:"15 sep 2023",
        views:23,
        likes:23,
        title:"that is title",
        description:"that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile",
        image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg",
        sections:[
            {image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg", paragraph:"that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile"},
            {image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg", paragraph:"that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile"},
            {image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg", paragraph:"that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile"},
            {image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg", paragraph:"that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile that is a hippo that live in rivers and fresh water but unfortunately there is none of the live in river Nile"},
        ]
    }
]


export const blogsSlice = createSlice({
    name: "blogSlice",
    initialState,
    reducers: {

    }
})