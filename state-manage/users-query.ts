import { createApi, fetchBaseQuery, FetchBaseQueryArgs, BaseQueryFn,
  FetchArgs, BaseQueryApi} from '@reduxjs/toolkit/query/react'

import { jwtDecode } from 'jwt-decode'
import { User } from './user-slice'
import { BACKEND_DOMAIN } from "@/app/functions";



export const authApiSecure = createApi({
  reducerPath: 'authapisecure',
  baseQuery: defaultBaseQuery({
    baseUrl: (BACKEND_DOMAIN+"/auth/"),
    credentials: "include",
  }) as any,
  endpoints: (build) => ({
    getUser: build.query<User, number>({
      query: (id)=>({
        url:`user-info/${id}/`,
        method:"get",
      }),
      keepUnusedDataFor: 10,
      transformResponse:(response):User=>transformUser(response),
    }),
    changeUserInfo: build.mutation<any, {id:number, data:any}>({
      query: ({id, data})=>{
        var formData = new FormData();
        formData.append("username",data.username);
        formData.append("bio",data.bio);
        data.background_image && formData.append("background_image",data.background_image);
        data.profile_image && formData.append("profile_image",data.profile_image);
        return {
          url:`user-info/${id}/`,
          method: "put",
          body: formData,
        }
      }
    }),
    search: build.query<{users:any, groups:any, blogs:any}, {searchType: string, searchParam:string}>({
      query: ({searchType, searchParam})=>({
        url:`search/${searchType}/${searchParam}/`,
        method: "get",
      }),
    }),
    getUsersById: build.query<any, number[]>({
      query:(ids_param)=>({
        headers:{
          "Content-Type": 'application/json'
        },
        url: "users-info/ids/",
        method: "put",
        body: JSON.stringify({ids:ids_param}),
      }),
    }),
    getFriends: build.query<any, number>({
      query:(id)=>`/user-friends/${id}/`,
    }),
    putFriends: build.mutation<any, {id:number, method:string, friendStatus:number}>({
      query:({id, method, friendStatus})=>{
        var formData = new FormData();
        formData.append("id", String(id));
        if(!method && friendStatus==0){
          method="put";
        }else if(!method){
          method="delete"
        }
        return{
          url:`/user-friends/0/`,
          method: method,
          body: formData,
        }
      },
    }),
    logout: build.query<any, void>({
      query:()=>({
        url:"/create/",
        method:"delete",
      }),
    }),
  }),
})


function transformUser(response:any){
  return {
    id:response.id,
    username:response.username,
    bio: response.bio,
    date: response.date_joined,
    backgroundImage: response.background_image,
    profileImage: response.profile_image,
    friendsNumber: response.friends_number,
    friendStatus: response.friend_status,
    blogsNumber: response.blogs_number,
  }
}


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserQuery,
  useChangeUserInfoMutation,
  useSearchQuery,
  useGetUsersByIdQuery,
  useGetFriendsQuery,
  usePutFriendsMutation,
  useLogoutQuery,
} = authApiSecure




export function defaultBaseQuery(args:FetchBaseQueryArgs):BaseQueryFn{
  var baseQuery = fetchBaseQuery(args);
  return async(args:string | FetchArgs, api: BaseQueryApi, extraOptions: any)=>{
    var raw_token = getCookieByName("access_token");
    if(!raw_token){
      throw {error:"not authenticated"};
    }
    var token = jwtDecode(raw_token as string);
    var current = Date.now()/1000;
    if(token.exp && token.exp<current){
      await fetch(BACKEND_DOMAIN+"/auth/token/refresh/", {method:"POST", credentials:"include"})
    }
    if(args=="") return {data:"authenticated"};
    return await baseQuery(args, api, extraOptions);
  }
}

function getCookieByName(name:string) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim(); // Remove leading/trailing whitespace

    // Check if this cookie starts with the desired name followed by "="
    if (cookie.startsWith(name + '=')) {
      // Extract and return the value part of the cookie
      return cookie.substring(name.length + 1);
    }
  }
  return null; // Return null if the cookie is not found
}