import { createSlice } from "@reduxjs/toolkit";

export interface Blog{
    userId:number,
    username:string,
    profileImage:string,
    id:number,
    date:string,
    category:number,
    title:string,
    isVideo:boolean,
    image:string,
    video:string,
    description:string,
    views:number,
    likes:number,
    liked:boolean,
    likedPeople: number[],
    viewedPeople: number[],
    sections:{image:string, content:string}[]
}



const initialState:Blog[] = [
    {
        userId:0,
        username: "",
        profileImage:"",
        id:0,
        date:"",
        category:0,
        title:"",
        isVideo:false,
        image:"",
        video:"",
        description:"",
        views:0,
        likes:0,
        liked:false,
        likedPeople:[],
        viewedPeople:[],
        sections:[
            {image:"", content:""},
        ]
    }
]


export const blogsSlice = createSlice({
    name: "blogSlice",
    initialState,
    reducers: {

    }
})