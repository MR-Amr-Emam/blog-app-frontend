import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { NavBar } from "@/app/navbar";
import { ProfilePic } from "./profile-pic";
import style from "./profile-page.module.css"
import { MiniNavbar } from "./mini-navbar";
import { AllBlogs } from "./all_blogs";
import { Videos } from "./videos";
import { EditMenu, FriendsMenu, RightSideMenu, EditProfilePic, UserDataEdit } from "./right-side-menu";
import { useParams } from "react-router";

import { useGetUserQuery } from "@/state-manage/users-query";
import { setRefetch } from "@/state-manage/profile-page-slice";


export default function ProfilePage(){
    const {id} = useParams();
    const profileId = Number(id || 0);
    const [isProfPic, setIsProfPic] = useState(false);
    const {userId, miniblogs} = useSelector((state:any)=>({userId:state.user.id, miniblogs:state.user.miniblogs}));
    const topHeader = useRef<HTMLDivElement>(null);
    const pageBody = useRef(null);
    const dispatch = useDispatch();
    
    //html states
    const [focused, setFocused] = useState("all blogs");
    const menus = ["all blogs", "videos"]
    const {sideMenuSelect, refetch} = useSelector((state:any)=>state.profilePage)
    const [editPic, setEditPic] = useState("");

    // data fetching
    const userDataObj = useGetUserQuery(profileId);
    const userData = userDataObj.data;
    const [userDataEdit, setUserDataEdit] = useState<UserDataEdit>();


    useEffect(()=>{
        if(topHeader.current && pageBody.current){
            var header = topHeader.current as HTMLElement;
            var body = pageBody.current as HTMLElement;
            body.style.top = header.offsetHeight.toString() + "px";
        }
    })


    useEffect(()=>{
        refetch && userDataObj.isSuccess && userDataObj.refetch();
        if(userDataObj.isSuccess){setUserDataEdit(userData); dispatch(setRefetch(false))}
    },[userDataObj.isSuccess, refetch])

    return (
        <div>
            <div className="position-fixed w-100 z-1" ref={topHeader}>
                <NavBar />
                <MiniNavbar menus={menus} focused={focused} setFocused={setFocused} />
            </div>
            <ProfilePic isProfPic={isProfPic} setIsProfPic={setIsProfPic} />

            {(editPic && userDataEdit)?<EditProfilePic
            setEditPic={setEditPic}
            profile={(editPic=="profile"&&true)||(editPic=="background"&&false)}
            url={editPic=="profile"?userDataEdit.profileImage:userDataEdit.backgroundImage}
            setUserDataEdit={setUserDataEdit}
            userDataEdit={userDataEdit} />:""}

            <div className="container-fluid myp-0 position-relative" ref={pageBody}>
                <div className="row w-100 m-0">
                    <div className="col-9 myp-0">
                        {focused=="all blogs"?<AllBlogs miniblogs={miniblogs} />:""}
                        {focused=="videos"?<Videos miniblogs={miniblogs} />:""}
                    </div>
                    <div className="col-3 myp-0">
                        <div className={`${style["right-side-menu"]} bg-light text-dark myfs position-fixed overflow-y-scroll`}
                        style={{height:`calc(100vh - ${topHeader.current?.offsetHeight.toString()}px)`}}>
                            
                            {sideMenuSelect=="menu"?<RightSideMenu
                            setIsProfPic={setIsProfPic}
                            miniblogs={miniblogs}
                            isAuthorized={userId==profileId}
                            profileId={profileId} />:""}

                            {sideMenuSelect=="friends"?<FriendsMenu
                            setIsProfPic={setIsProfPic}
                            />:""}
                            
                            {(sideMenuSelect=="edit" && userDataEdit)?<EditMenu
                            userDataEdit={userDataEdit}
                            setUserDataEdit={setUserDataEdit}
                            setEditPic={setEditPic}/>:""}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}