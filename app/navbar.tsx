import {Link} from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState, Dispatch, SetStateAction, } from "react";
import { useGetUsersQuery } from "@/state-manage/users-query";
import { useGetInvitesQuery, useDeleteInvitesMutation } from "@/state-manage/groups-query";
import { User } from "@/state-manage/users-slice";
import { useParams } from "react-router";

export function NavBar(){
    const userId = useSelector((state:any)=>state.user.id);
    const [isSearch, setIsSearch] = useState(false);
    const {id} = useParams();
    useEffect(()=>{setIsSearch(false)}, [id]);

    return (
    <div className="bg-first text-light myfs myp-3 position-relative">
        <div className="d-flex justify-content-between w-100">
            <div>
                <div className="d-flex myp-1">
                    <div className="mx-2 pointer glory">Blog</div>
                    <div className="mx-2 pointer glory"><Link to="/home">home</Link></div>
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
                    <div className="pointer glory mx-2">
                        messages
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
    const categories = ["all", "people", "posts", "groups"];
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
            {searchParam && category=="people" && <UsersSearchResult searchParam={searchParam} />}
        </div>
    )
}

function UsersSearchResult({searchParam}:{searchParam:string}){
    const {data, isSuccess} = useGetUsersQuery(searchParam);
    return (
        <div>
            {isSuccess && data.map((ele:User, index:number)=>
            <Link key={index} to={`/profile/${ele.id}`}><div className="myfs-mini myp-1 mb-2 pointer rounded"
            onMouseEnter={(e)=>{e.currentTarget.classList.add("bg-gray")}}
            onMouseLeave={(e)=>{e.currentTarget.classList.remove("bg-gray")}}>
                <div className="d-flex align-items-center">
                    <div className="mx-1"><img className="circle-mini" src={ele.profileImage} /></div>
                    <div className="mx-1">{ele.username}</div>
                </div>
            </div>
            </Link>
            )}
        </div>
    )
}


function Invites(){
    const {data, isSuccess, refetch} = useGetInvitesQuery();
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
        <div className="pointer" onClick={()=>{setInvites(true); console.log("clicek");}}>invites</div>
        {invites && <div className="position-absolute z-2 rounded top-100 start-50
        translate-middle-x bg-white shadow" style={{width:"300%"}}>
            {isSuccess && data.map((invite:any, index:number)=>
            <div key={index} className="myp-1 myfs-mini text-dark">
                <span className="fw-semibold me-2"><Link to={`/profile/${invite.inviter.id}`}>{invite.inviter.username}</Link></span>
                has invited you to
                <span className="fw-semibold ms-2"><Link to={`/group/${invite.group.id}`}>{invite.group.name}</Link></span>
                <span className="ms-1 text-danger pointer" onClick={()=>{mutate(invite.id)}}>D</span>

            </div>)}
        </div>}
    </div>
    )
}