import { Link } from "react-router";
import style from "./home-page.module.css";

import { useGetFriendsQuery } from "@/state-manage/users-query";
import { useGetGroupsQuery } from "@/state-manage/groups-query";
import { useSelector } from "react-redux";
import { Dispatch } from "react";
import { ChatLeftDotsFill } from "react-bootstrap-icons";

interface Props{
    setCreateGroup:Dispatch<boolean>,
}

export function RightSideMenu({setCreateGroup}:Props){
    const userId = useSelector((state:any)=>state.user.id);
    const friendsObj = useGetFriendsQuery(userId);
    const groupsObj = useGetGroupsQuery(userId);
    return(
        <div className={`${style["right-menu"]} bg-light text-dark myp-3 myfs h-100 w-90 position-relative`}>
            <div className="fw-semibold myfs-4">friends</div>
            {friendsObj.isSuccess && friendsObj.data.friends.map((friend:any, index:number)=>{
                return(
                    <div key={index} className="d-flex align-items-center mt-3">
                        <div><img src={friend.profile_image} className="circle-mini" /></div>
                        <Link to={`/profile/${friend.id}`}><div className="myfs-mini mx-2 pointer">{friend.username}</div></Link>
                        <Link to={`/chat/${friend.id}`}><div className="mx-2 myfs-mini text-first pointer"><ChatLeftDotsFill /></div></Link>
                    </div>
                )
            })}

            <div className="fw-semibold myfs-4 mt-4">groups</div>
            {groupsObj.isSuccess && groupsObj.data.map((group:any, index:number)=>{
                return(
                    <Link key={index} to={`/group/${group.id}`}><div className="d-flex align-items-center mt-3">
                        <div><div style={{
                            width: "calc(1.8 * var(--unit))",
                            height: "calc(1.8 * var(--unit))",
                            backgroundImage: `url(${group.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "50%",
                        }} /></div>
                        <div className="myfs-mini mx-2 pointer">{group.name}</div>
                    </div></Link>
                )
            })}
            <div className="myfs-mini text-gray pointer" onClick={()=>{setCreateGroup(true)}}>+ create group</div>
        </div>
    )
}