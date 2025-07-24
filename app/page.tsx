"use client";

import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "@/state-manage/store";
import { InitialSetup } from "./initial-setup";
import ProfilePage from "@/profile-page/profile-page";
import BlogPage from "@/blog-page/blog-page";
import HomePage from "@/home-page/home-page"
import { GroupPage } from "@/group-page/group-page";

import { useEffect, useState } from "react";
import { ChatPage } from "@/chat-page/chat-page";

export const BACKEND_DOMAIN:string = "http://localhost:8000/";


export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(()=>{
    setIsClient(true);
    isClient && fetch(BACKEND_DOMAIN+"auth/token/refresh/", {method:"POST", credentials:"include"})
    .then((response)=>{response.ok&&setIsAuth(true);setIsLoaded(true);})
    .catch((error)=>{console.log(error); setIsLoaded(true)});
  }, [isClient])


  if(!isClient || !isLoaded){
    return null;
  }

  if(isLoaded && !isAuth){
    return <p className="text-danger text-center myfs-3">not authenticated!!</p>
  }

  return (
    <Provider store={store}>
      <InitialSetup />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/group/:groupId" element={<GroupPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

