import {Link} from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState, Dispatch, SetStateAction, } from "react";
import { useSearchQuery, useGetFriendsQuery, useLogoutQuery } from "@/state-manage/users-query";
import { useGetInvitesQuery, useDeleteInvitesMutation } from "@/state-manage/groups-query";
import { User } from "@/state-manage/user-slice";
import { TrashFill } from "react-bootstrap-icons";
import { useParams } from "react-router";

import { ChatLeftDotsFill,
    BoxArrowInRight,
    BellFill,  } from "react-bootstrap-icons"

export function NavBar(){
    const userId = useSelector((state:any)=>state.user.id);
    const [isSearch, setIsSearch] = useState(false);
    const {id} = useParams();
    const [isLogout, setIsLogout] = useState(false);
    useEffect(()=>{setIsSearch(false)}, [id]);

    return (
    <div className="bg-first text-light myfs myp-3 position-relative">
        <div className="d-flex justify-content-between w-100">
            <div>
                <div className="d-flex myp-1">
                    <div className="mx-2 pointer glory">Blog</div>
                    <div className="mx-2 pointer glory"><Link to="/">home</Link></div>
                    <div className="mx-2 pointer glory"><Link to={`/profile/${userId}`}>profile</Link></div>
                </div>
            </div>
            <div className="mx-2 position-relative" style={{width:"50%"}}>
                {isSearch?<Search setIsSearch={setIsSearch} />:""}
                {!isSearch?
                <div className="bg-light d-flex text-gray rounded align-items-center w-100 myp-1"
                onClick={()=>{setIsSearch(true)}} style={{cursor:"text"}}>
                    <div className="mx-1 pointer">Search</div>
                    <div className="myinput bg-light myp-0 mx-1 text-gray w-100 h-100" style={{border:"0px", cursor:"text"}} />
                </div>
                :""}
            </div>
            <div>
                <div className="d-flex">
                    <div className="glory mx-2">
                        <Invites />
                    </div>
                    <div className="glory mx-2">
                        <Messages />
                    </div>
                    <div className="pointer glory mx-2">
                        <BoxArrowInRight className="myfs-4" onClick={()=>{setIsLogout(true)}} />
                        {isLogout && <Logout />}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

interface SearchProps{
    setIsSearch:Dispatch<SetStateAction<boolean>>,
}

function Search({setIsSearch}:SearchProps){
    const categories = ["all", "people", "blogs", "groups"];
    const [category, setCategory] = useState("all");
    const [searchParam, setSearchParam] = useState<string>("");
    const searchEle = useRef<HTMLDivElement>(null);
    function closeSearch(e:Event){
        var target = e.target as HTMLElement;
        searchEle.current && !searchEle.current.contains(target) && setIsSearch(false);
    }

    useEffect(()=>{
        document.addEventListener("click",closeSearch);
        return ()=>{document.removeEventListener("click",closeSearch);}
    })

    return (
        <div className="position-absolute z-2 bg-light rounded w-100 text-gray" ref={searchEle}
        style={{
            padding:"calc(0.25 * var(--unit))",
            top: "calc(-0.25 * var(--unit))",
            left: "calc(-0.25 * var(--unit))",
            minWidth: "calc(17 * var(--unit))",
        }}>
            <div className="bg-white d-flex position-relative border rounded align-items-center
            justify-content-around myp-1 w-100 mb-2">
                <div className="mx-1">Search</div>
                <input type="text" autoFocus className="myinput myp-0 mx-1 text-gray" style={{border:"0px"}}
                onChange={(e)=>{setSearchParam((e.target as HTMLInputElement).value)}} />
            </div>
            <div className="d-flex">
                {categories.map((ele, index)=>
                <div key={index} className={`${ele==category && "focused"} myp-1 rounded mx-2 myfs-mini pointer option-select`} onClick={()=>{setCategory(ele)}}>{ele}</div>
                )}
            </div>
            {searchParam && <SearchResult category={category} searchParam={searchParam} />}
        </div>
    )
}

function SearchResult({category, searchParam}:{category:string, searchParam:string}){
    const searchType = category=="people"?"users":category;
    const {data, isSuccess} = useSearchQuery({searchType, searchParam});
    return (
        <div>
            {isSuccess && data.users?.map((ele:any, index:number)=>
            <ResultItem key={index} url={`/profile/${ele.id}`} id={ele.id} text={ele.username}
            image={ele.profile_image} type="user" />)}

            {isSuccess && data.groups?.map((ele:any, index:number)=>
            <ResultItem key={index} url={`/group/${ele.id}`} id={ele.id} text={ele.name}
            image={ele.image} type="group" />)}

            {isSuccess && data.blogs?.map((ele:any, index:number)=>
            <ResultItem key={index} url={`/blog/${ele.id}`} id={ele.id} text={ele.title}
            image={ele.image} type="blog" />)}
        </div>
    )
}

function ResultItem({url, id, text, image, type}:{url:string, id:number, text:string, image:string, type:string}){
    return (
        <Link to={url}><div className="myfs-mini myp-1 mb-2 pointer rounded"
        onMouseEnter={(e)=>{e.currentTarget.classList.add("bg-gray")}}
        onMouseLeave={(e)=>{e.currentTarget.classList.remove("bg-gray")}}>
            <div className="d-flex align-items-center">
                <div className="mx-1"><div className={type!="blog"?"rounded-circle":""} style={{
                    width:"calc(1.8 * var(--unit))",
                    height:"calc(1.8 * var(--unit))",
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }} /></div>
                <div className="mx-1">{text}</div>
                <div className="mx-3 text-gray">{type}</div>
            </div>
        </div></Link>)
}


function Invites(){
    const {data, isSuccess, refetch} = useGetInvitesQuery(null, {refetchOnMountOrArgChange:true});
    const [invites, setInvites] = useState(false);
    const eleRef = useRef<HTMLDivElement>(null);
    const [mutate, result] = useDeleteInvitesMutation()

    useEffect(()=>{
        result.isSuccess && refetch();
    }, [result.isSuccess])

    useEffect(()=>{
        function close(e:Event){
            let target = e.target as HTMLElement;
            if(eleRef.current && !eleRef.current.contains(target)){
                setInvites(false);
            }
        }
        invites && document.addEventListener("click", close)
        return ()=>{document.removeEventListener("click", close)}
    }, [invites])
    return (
    <div className="position-relative" ref={eleRef}>
        <div className="pointer" onClick={()=>{setInvites(true);}}>
            <BellFill className="myfs-4" />
        </div>
        {(isSuccess && data.length)?<div className=
        "position-absolute z-2 rounded-circle bottom-50 start-100 myp-1" style={{backgroundColor:"red"}} />:""}
        
        {invites && <div className="position-absolute z-2 rounded top-100 start-50
        translate-middle-x bg-white shadow" style={{width:"calc(8 * var(--unit))"}}>
            {isSuccess && !data.length && <div className="myp-1 myfs-mini text-dark">no invites</div>}
            {isSuccess && data.map((invite:any, index:number)=>
            <div key={index} className="myp-1 myfs-mini text-dark">
                <span className="fw-semibold me-2"><Link to={`/profile/${invite.inviter.id}`}>{invite.inviter.username}</Link></span>
                has invited you to
                <span className="fw-semibold ms-2"><Link to={`/group/${invite.group.id}`}>{invite.group.name}</Link></span>
                <span className="ms-1 text-danger pointer" onClick={()=>{mutate(invite.id)}}><TrashFill /></span>

            </div>)}
        </div>}
    </div>
    )
}

function Messages(){
    const userId = useSelector((state:any)=>state.user.id)
    const {data, isSuccess} = useGetFriendsQuery(userId, {refetchOnMountOrArgChange:true});
    const [isShow, setIsShow] = useState(false);
    const eleRef = useRef<HTMLDivElement>(null);
    const unseens = isSuccess && data.friends.filter((friend:any)=>friend.unseens);

    useEffect(()=>{
        function close(e:Event){
            let target = e.target as HTMLElement;
            if(eleRef.current && !eleRef.current.contains(target)){
                setIsShow(false);
            }
        }
        isShow && document.addEventListener("click", close)
        return ()=>{document.removeEventListener("click", close)}
    }, [isShow])
    return (
    <div className="position-relative" ref={eleRef}>
        <div className="pointer" onClick={()=>{setIsShow(true)}}>
            <ChatLeftDotsFill className="myfs-4" />
        </div>
        {(isSuccess && data.friends.filter((friend:any)=>friend.unseens).length)?<div className=
        "position-absolute z-2 rounded-circle bottom-50 start-100 myp-1" style={{backgroundColor:"red"}} />:""}

        {isShow && <div className="position-absolute z-2 rounded top-100 start-50
        translate-middle-x bg-white shadow" style={{width:"calc(8 * var(--unit))"}}>
            {isSuccess && !unseens.length && <div className="myp-1 myfs-mini text-dark">no messages</div> }
            {isSuccess && unseens && unseens.map((friend:any, index:number)=>
            <Link key={index} to={`/chat/${friend.id}`}><div className="myp-1 myfs-mini text-dark pointer d-flex align-items-center rounded mt-1"
            onMouseEnter={(e)=>{e.currentTarget.classList.add("bg-gray")}}
            onMouseLeave={(e)=>{e.currentTarget.classList.remove("bg-gray")}}
            >
                <div><img className="circle-mini" src={friend.profile_image} /></div>
                <div className="mx-2 myfs-mini">
                    {friend.username}
                    <span className="mx-2 bg-success text-white rounded-4"
                    style={{padding:"3px", fontSize:"calc(0.7 * var(--unit))"}}>{friend.unseens}</span>
                </div>
            </div></Link>)}
        </div>}
    </div>
    )
}


function Logout(){
    const {data, isSuccess} = useLogoutQuery();
    if(isSuccess){window.location.href = window.location.origin+"/login";}
    return <></>
}