import { useEffect, useRef, useState, Dispatch } from "react";
import { Link, useParams } from "react-router"

import { useGetFriendsQuery, defaultBaseQuery } from "@/state-manage/users-query";
import { BACKEND_DOMAIN, calc_date } from "@/app/functions"

import { NavBar } from "@/app/navbar";
import { useSelector } from "react-redux";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

interface MsgType{
    msg:string,
    user_id:number,
    date:null|string,
}

export function ChatPage(){
    const {friendId} = useParams();
    const topHeader = useRef<HTMLDivElement>(null);
    const pageBody = useRef<HTMLDivElement>(null);
    const chatBox = useRef<HTMLDivElement>(null);
    const userId = useSelector((state:any)=>state.user.id)
    const [currentFriend, setCurrentFriend] = useState<any>(null);
    const {data, isSuccess} = useGetFriendsQuery(Number(userId || 0));

    const [msgs, setMsgs] = useState<MsgType[]>([]);

    useEffect(()=>{
        isSuccess && friendId && setCurrentFriend(data.friends.filter((friend:any)=>friendId==friend.id)[0]);
    }, [isSuccess, friendId])

    useEffect(()=>{
            if(topHeader.current && pageBody.current){
                var header = topHeader.current as HTMLElement;
                var body = pageBody.current as HTMLElement;
                body.style.top = header.offsetHeight.toString() + "px";
            }
        })
    useEffect(()=>{
        chatBox.current?.lastElementChild?.scrollIntoView(false);
    }, [msgs])
    return <div>
        <div className="position-fixed w-100 z-1" ref={topHeader}>
            <NavBar />
        </div>
        <div className="position-relative" ref={pageBody}>
            <div className="row w-100">
                <div className="col-4 myp-0">
                    <div className="position-fixed myp-3 start-0 text-dark"
                    style={{height:`calc(100vh - ${topHeader.current?.offsetHeight}px`, width:"33.33%"}}>
                        <div className="bg-light myp-2 rounded w-100 h-100">
                            <div className="fw-semibold myfs-4">Friends</div>
                            {isSuccess && data.friends.map((friend:any, index:number)=>
                            <Friend key={index} friend={friend} setState={setCurrentFriend} />)}
                        </div>
                    </div>
                </div>
                <div className="col-8 myp-3" style={{height:`calc(100vh - ${topHeader.current?.offsetHeight}px`}}>
                    <div className="bg-light rounded d-flex flex-column h-100">
                        <div className="border-bottom myp-2 w-100">
                            <p className="myfs-4 fw-semibold">messages</p>
                            {currentFriend?<div className="d-flex align-items-center">
                                <div><img className="circle-1" src={currentFriend.profile_image} /></div>
                                <div className="myfs mx-2"><Link to={`/profile/${currentFriend.id}`}>{currentFriend.username}</Link></div>
                            </div>:""}
                        </div>
                        <div className="myp-2 w-100 flex-grow-1 overflow-y-scroll" ref={chatBox}>
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-column flex-grow-1">
                                {msgs.map((data:MsgType, index:number)=>
                                <Msg key={index} msgData={data} friendData={currentFriend} />)}
                                </div>
                                {currentFriend?<ChatInput msgs={msgs} setMsgs={setMsgs} friend={currentFriend} />:""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}



function Friend({friend, setState}:{friend:any, setState:Dispatch<any>}){
    return (
        <div className={`d-flex mb-3 align-items-center myp-1 rounded pointer`}
        onMouseEnter={(e)=>{e.currentTarget.classList.add("bg-gray")}}
        onMouseLeave={(e)=>{e.currentTarget.classList.remove("bg-gray")}}
        onClick={()=>setState(friend)}
        >
            <div>
                <img className="circle-mini" src={friend.profile_image} />
            </div>
            <div className="position-relative w-100 mx-3 myfs-mini">
                <span className="fw-semibold">{friend.username}</span>
                {friend.unseens?<span className="mx-2 bg-success text-white rounded-4"
                style={{padding:"3px", fontSize:"calc(0.7 * var(--unit))"}}>{friend.unseens}</span>:""}
            </div>
        </div>
    )
}

interface MsgProps {
    msgData:MsgType,
    friendData:{id:number, username:string, profile_image:string},
}


function Msg({msgData, friendData}:MsgProps){
    const userId = useSelector((state:any)=>state.user.id)
    const friendId = friendData.id
    if(msgData.user_id==userId)return(
        <div className="position-relative d-flex justify-content-end mt-3">
            <div className="text-end" style={{maxWidth:"75%"}}>
                <div className="bg-primary text-white myp-1 rounded-4 myfs px-3">{msgData.msg}</div>
                {msgData.date?<div className="myfs-mini text-gray">{calc_date(msgData.date)}</div>:""}
            </div>
        </div>
    );
    else if(msgData.user_id==friendId)return(
        <div className="d-flex align-items-top mt-3">
            <div>
                <img className="circle-mini" src={friendData.profile_image} />
            </div>
            <div className="mx-2" style={{maxWidth:"75%"}}>
                <div className="bg-gray text-dark myp-1 rounded-4 myfs px-3">{msgData.msg}</div>
                {msgData.date?<div className="myfs-mini text-gray">{calc_date(msgData.date)}</div>:""}
            </div>
        </div>
    )
    return <></>;
}


function ChatInput({msgs, setMsgs, friend}:{msgs:{msg:string, user_id:number}[], setMsgs:Dispatch<any>, friend:any}){
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(()=>{
        var chatSocket:WebSocket;
        chatSocket = new WebSocket(`ws${BACKEND_DOMAIN.split("http")[1]}/ws/chat/${friend.id}/`);
        async function send(e:KeyboardEvent){
            if(e.key=="Enter"){
                var inputEle = e.currentTarget as HTMLInputElement;
                var authFunc = defaultBaseQuery({baseUrl:""});
                var res = await authFunc("", {} as BaseQueryApi, {})
                if(res.error){console.error("not authenticated"); return;}
                if(chatSocket.readyState!=WebSocket.OPEN){
                    chatSocket = new WebSocket(`ws${BACKEND_DOMAIN.split("http")[0]}/ws/chat/${friend.id}/`);
                }
                chatSocket.send(JSON.stringify({msg:inputEle.value}))
                inputEle.value="";
            }
        }
        chatSocket.onmessage = (e)=>{
            let data = JSON.parse(e.data);
            let length = data.length;
            if(typeof length == "number"){
                msgs = data
                setMsgs(msgs);
            }else{
                msgs = [...msgs, data];
                setMsgs(msgs);
            }
        }
        const inputEle = inputRef.current
        if (!inputEle)return;
        inputEle.addEventListener("keydown", send);
        return ()=>{
            inputEle.removeEventListener("keydown", send);
            chatSocket.close();
        }
    }, [friend])
    return (
        <input ref={inputRef} type="text" className="myinput bg-white rounded-pill myfs myp-1 border bg-white mt-3 text-dark px-3"/>
    )
}