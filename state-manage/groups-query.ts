import { createApi } from "@reduxjs/toolkit/query/react";

import { defaultBaseQuery } from "./users-query";

import { Blog } from "./blogs-slice"
import { BACKEND_DOMAIN } from "@/app/functions";

export const GroupsApi = createApi({
    reducerPath:"groupsapi",
    baseQuery:defaultBaseQuery({
        baseUrl:BACKEND_DOMAIN+"/groups/",
        credentials: "include",
    }),
    endpoints: (build) => ({
        getGroups: build.query<any, number>({
            query:(id)=>id+"/",
        }),
        getGroup: build.query<any, number>({
            query:(id)=>`group/${id}/`,
            transformResponse:(response:any)=>{
                var blogs = response.blogs.map((blog:any)=>{
                    return transformBlog(blog);
                })
                response.blogs = blogs;
                return response;
            }
        }),
        createGroup: build.mutation<any, FormData>({
            query:(formData)=>({
                url: "create/",
                method: "post",
                body: formData,
            }),
        }),
        editGroup: build.mutation<any, {formData:FormData, id:number}>({
            query:({formData, id})=>({
                url: `group/${id}/`,
                method: "put",
                body: formData,
            }),
        }),
        joinRequest: build.mutation<any, {id:number, type:string, data?:any}>({
            query:({id, type, data})=>({
                headers:{
                    "Content-Type":"application/json",
                },
                url: `joinrequest/${id}/${type}/`,
                method: "put",
                body: data||"",
            }),
        }),
        getRequests: build.query<any, {id:number, type:string, data?:any}>({
            query:({id, type, data})=>({
                url: `admin/${id}/${type}/`,
            }),
        }),
        getInvites: build.query<any, null>({
            query:(n)=>({
                url: "invite/",
            }),
        }),
        deleteInvites: build.mutation<any, number>({
            query:(id)=>({
                url: `invite/${id}/`,
                method: "delete",
            }),
        }),
    }),
})

export const { useGetGroupsQuery,
    useGetGroupQuery,
    useCreateGroupMutation,
    useEditGroupMutation,
    useJoinRequestMutation,
    useGetRequestsQuery,
    useGetInvitesQuery,
    useDeleteInvitesMutation, } = GroupsApi

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