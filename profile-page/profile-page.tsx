import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { NavBar } from "@/app/navbar";
import { Blog } from "./blog";
import { ProfilePic } from "./profile-pic";
import style from "./profile-page.module.css"
import { MiniNavbar } from "./mini-navbar";
import { AllBlogs } from "./all_blogs";
import { Videos } from "./videos";
import { FriendsMenu, RightSideMenu } from "./right-side-menu";

export default function ProfilePage(){
    const [isProfPic, setIsProfPic] = useState(false);
    const miniblogs = useSelector((state:any)=>state.users[0].miniblogs);
    const topHeader = useRef(null);
    const pageBody = useRef(null);

    const [focused, setFocused] = useState("all blogs");
    const menus = ["all blogs", "videos"]

    const [sideMenuSelect, setSideMenuSelect] = useState("menu");
    
    useEffect(()=>{
        if(topHeader.current && pageBody.current){
            var header = topHeader.current as HTMLElement;
            var body = pageBody.current as HTMLElement;
            body.style.top = header.offsetHeight.toString() + "px";
        }
    })

    return (
        <div>
            <div className="position-fixed w-100 z-1" ref={topHeader}>
                <NavBar />
                <MiniNavbar menus={menus} focused={focused} setFocused={setFocused} />
            </div>
            <ProfilePic isProfPic={isProfPic} setIsProfPic={setIsProfPic} />
            <div className="container-fluid myp-0 position-relative" ref={pageBody}>
                <div className="row w-100 m-0">
                    <div className="col-9 myp-0">
                        {focused=="all blogs"?<AllBlogs miniblogs={miniblogs} />:""}
                        {focused=="videos"?<Videos miniblogs={miniblogs} />:""}
                    </div>
                    <div className="col-3 myp-0">
                        <div className={`${style["right-side-menu"]} bg-light text-dark myfs h-100 position-fixed overflow-y-scroll`}>
                            {sideMenuSelect=="menu"?<RightSideMenu setIsProfPic={setIsProfPic} miniblogs={miniblogs} setSideMenuSelect={setSideMenuSelect} />:""}
                            {sideMenuSelect=="friends"?<FriendsMenu setIsProfPic={setIsProfPic} setSideMenuSelect={setSideMenuSelect} />:""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}