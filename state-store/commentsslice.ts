import { createSlice } from "@reduxjs/toolkit";

interface Comment{
    username:string,
    image:string,
    date:string,
    comment:string,
    likes:number,
    comments: Comment[],
}



const initialState:Comment[] = [
    {
        username: "amr emam",
        image: "https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg",
        date:"2 months ago",
        likes: 23,
        comment: "that is nice hippo, nice job Amr keep going we all proud of you",
        comments: [
            {username:"ahmed", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg", date:"two months ageo", likes:23, comment:"hello I am Ahmed, great job Amr we are proud", comments:[]},
            {username:"ahmed", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg", date:"two months ageo", likes:23, comment:"hello I am Ahmed, great job Amr we are proud", comments:[]},
            {username:"ahmed", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg", date:"two months ageo", likes:23, comment:"hello I am Ahmed, great job Amr we are proud", comments:[]},
        ]
    },
    {
        username: "amr emam",
        image: "https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg",
        date:"2 months ago",
        likes: 23,
        comment: "that is nice hippo, nice job Amr keep going we all proud of you",
        comments: [
            {username:"ahmed", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg", date:"two months ageo", likes:23, comment:"hello I am Ahmed, great job Amr we are proud", comments:[]},
            {username:"ahmed", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg", date:"two months ageo", likes:23, comment:"hello I am Ahmed, great job Amr we are proud", comments:[]},
            {username:"ahmed", image:"https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg", date:"two months ageo", likes:23, comment:"hello I am Ahmed, great job Amr we are proud", comments:[]},
        ]
    }
]


export const commentsSlice = createSlice({
    name: "commentsSlice",
    initialState,
    reducers: {

    }
})