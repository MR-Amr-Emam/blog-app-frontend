import { createApi } from "@reduxjs/toolkit/query/react";

import { defaultBaseQuery } from "./users-query";

import { Blog } from "./blogs-slice"
import { BACKEND_DOMAIN } from "@/app/functions";

export const BlogsApi = createApi({
    reducerPath:"blogsapi",
    baseQuery:defaultBaseQuery({
        baseUrl:BACKEND_DOMAIN+"/blogs/",
        credentials: "include",
    }),
    endpoints: (build) => ({
        getBlogs: build.query<Blog[], {id:number, type?:string}>({
            query:({id, type})=>`${id}/${type?(type+"/"):""}`,
            transformResponse: (response:any):Blog[]=>{
                var blogs:Blog[] = []
                response.forEach((blog:any)=>{
                    blogs.push(transformBlog(blog))
                })
                return blogs;
            },
        }),
        getHomeBlogs: build.query<Blog[], void|any>({
            query:(id)=>`home/${id?id+"/":""}`,
            transformResponse: (response:any):Blog[]=>{
                var blogs:Blog[] = []
                response.forEach((blog:any)=>{
                    blogs.push(transformBlog(blog))
                })
                return blogs;
            },
        }),
        getBlog: build.query<Blog, number>({
            query:(id)=>`blog/${id}/`,
            transformResponse: transformBlog,
        }),
        putBlog: build.mutation<Blog, number>({
            query:(id)=>({url:`blog/${id}/`, method:"PATCH"}),
            transformResponse: transformBlog,
        }),
        submitBlog: build.mutation<any, FormData>({
            query: (formData)=>({url:"blog/create/", method:"post", body:formData}),
        }),
        getComments: build.query<any, number>({
            query:(id)=>`blog/${id}/comments/`,
        }),
        putComment: build.mutation<any, {id:number, data:any}>({
            query:({id, data})=>({
                url: `blog/${id}/comment/`,
                headers:{
                    "Content-Type":"application/json",
                },
                method: "post",
                body: JSON.stringify(data),
            })
        }),
        likeComment: build.mutation<any, number>({
            query:(id)=>({
                url: `comment/${id}/`,
                method: "PATCH",
            })
        }),
        getCategorys: build.query<any, void>({
            query:()=>`categorys/`,
        }),
    }),
})

export const { useGetBlogsQuery,
    useGetHomeBlogsQuery,
    usePutBlogMutation,
    useGetBlogQuery,
    useSubmitBlogMutation,
    useGetCommentsQuery,
    usePutCommentMutation,
    useLikeCommentMutation,
    useGetCategorysQuery, } = BlogsApi


function transformBlog(response:any):Blog{
    var blog:Blog = {
        userId: response.user.id,
        username: response.user.username,
        profileImage:  response.user.profile_image,
        id: response.id,
        date: response.date,
        category: response.category,
        title: response.title,
        isVideo: response.is_video,
        image: response.image,
        video: response.video,
        description: response.description,
        likes: response.likes_number,
        views: response.views_number,
        likedPeople: response.liked_people,
        viewedPeople: response.viewed_people,
        liked: response.liked,
        sections: response.section_set,
    }
    return blog;
}