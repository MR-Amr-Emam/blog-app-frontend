"use client"

import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "@/state-manage/store";
import { InitialSetup } from "./initial-setup";
import ProfilePage from "@/profile-page/profile-page";
import BlogPage from "@/blog-page/blog-page";
import HomePage from "@/home-page/home-page";
import { GroupPage } from "@/group-page/group-page";
import { ChatPage } from "@/chat-page/chat-page";


export function PageBody(){
    const [isClient, setIsClient] = useState(false);
    useEffect(()=>{
      setIsClient(true);
    }, [])

    if(!isClient)return null;


    return (
        <Provider store={store}>
          <InitialSetup />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/blog/:id" element={<BlogPage />} />
              {/*<Route path="/home" element={<HomePage />} />*/}
              <Route path="/group/:groupId" element={<GroupPage />} />
              <Route path="/chat/:friendId" element={<ChatPage />} />
            </Routes>
          </BrowserRouter>
        </Provider>
    )
}