"use client";

import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "@/state-store/store";

import ProfilePage from "@/profile-page/profile-page";
import BlogPage from "@/blog-page/blog-page";
import HomePage from "@/home-page/home-page"


import { useEffect, useState } from "react";
import { GroupPage } from "@/group-page/group-page";


export default function Home() {
  const message = "that is for branch testing :)";

  const hello = "hello";
  const [isClient, setIsClient] = useState(false);
  const addition = "addition";

  useEffect(()=>{
    setIsClient(true);
  })
  
  if(!isClient){
    return null;
  }

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/group" element={<GroupPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
    /*<Provider store={store}>
      <BlogPage />
    </Provider>*/
  );
}

