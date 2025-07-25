import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, useState, Dispatch } from "react";

import { Link, useParams } from "react-router";
import { useGetGroupQuery, useJoinRequestMutation, useGetRequestsQuery } from "@/state-manage/groups-query";

import { CreateGroup } from "@/home-page/create-group";
import { Blog } from "@/home-page/blog";
import { AddBlog } from "@/home-page/add-blog";

import { setBlogSubmitted } from "@/state-manage/user-slice";

import { NavBar } from "@/app/navbar";
import { Btns } from "./btns";

export function GroupPage(){
    const {groupId} = useParams();
    const topHeader = useRef<HTMLDivElement>(null);
    const pageBody = useRef(null);
    const blogSubmitted = useSelector((state:any)=>state.states.blogSubmitted)
    const dispatch = useDispatch()

    const [addBlog, setAddBlog] = useState(false);
    const [editGroup, setEditGroup] = useState(false);
    const {data, isSuccess, refetch} = useGetGroupQuery(Number(groupId||1));
    

    useEffect(()=>{
            blogSubmitted && setTimeout(()=>{dispatch(setBlogSubmitted(false))}, 2000)
        }, [blogSubmitted])
    

    useEffect(()=>{
        if(topHeader.current && pageBody.current){
            var header = topHeader.current as HTMLElement;
            var body = pageBody.current as HTMLElement;
            body.style.top = header.offsetHeight.toString() + "px";
        }
    })

    useEffect(()=>{
        !editGroup && refetch();
    }, [editGroup])


    return (
        <div>
            {editGroup?<CreateGroup
            setCreateGroup={setEditGroup}
            initialData={data} />:""}

            {addBlog?<AddBlog
            setAddBlog={setAddBlog}
            group_id={Number(groupId||1)} />:""}
            <div className="position-fixed w-100 z-1" ref={topHeader}>
                <NavBar />
            </div>
            {blogSubmitted?<div className="shadow text-success myp-2 myfs rounded position-fixed fw-bold
            z-1 bg-white" style={{bottom:"10%", right:"10%"}}>submitted successfully</div>:""}
            <div className="position-relative" ref={pageBody}>
                <div className="position-relative">
                    <div className="position-relative start-50 translate-middle-x w-90">
                        <div>
                            <img src={isSuccess?data.image:undefined}
                            className="w-100 rounded-bottom ratio ratio-21x9" style={{aspectRatio:3}} />
                        </div>
                        <div className="w-90 position-relative start-50 translate-middle-x myfs">
                            <div className="rounded-bottom bg-light myp-2">
                                <p className="text-first myfs-2 fw-semibold">{isSuccess && data.name}</p>
                                <div className="text-dark-emphasis">{isSuccess && data.members_number} members</div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex">
                                        {isSuccess && data.members.map((member:any, index:number)=>
                                        <Member key={index} member={member} refetch={refetch} isAdmin={data.user_status==3} />)}
                                    </div>
                                    <Btns setEditGroup={setEditGroup} refetch={refetch} />
                                </div>
                            </div>
                            {/* BODY GOES FROM HERE */}
                            <div>
                                <div className="row w-100 m-0">
                                    <div className="col-8">
                                        <div className="position-relative my-3">
                                            {(data && data.user_status>1)?<div className="pointer myfs myp-1 rounded shadow"
                                            onClick={()=>{setAddBlog(true)}}>make new blog...</div>:""}
                                            {isSuccess && data && data.blogs.map((blog:any, index:number)=>
                                            <Blog key={index} blog={blog} refetch={refetch} />)}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="position-sticky overflow-y-scroll"
                                        style={{top:topHeader.current?.offsetHeight,
                                        height:`calc(100vh - ${topHeader.current?.offsetHeight}px`}}>
                                            {data && data.user_status==3?<Requests refetch={refetch} />:""}
                                            <div className="bg-light rounded myp-2 border mt-3">
                                                <p className="text-center myfs fw-semibold text-first">about group</p>
                                                <p className="text-dark myfs-mini">{data && data.description}</p>
                                            </div>
                                            <div className="bg-light rounded myp-2 border mt-3">
                                                <p className="text-center myfs fw-semibold text-first">top blog</p>
                                                <p className="text-dark myfs-mini">that part is supposed to be the top blogs here so assume that untill it comes true</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface Props{
    refetch: any,
}

function Requests({refetch}:Props){
    const {groupId} = useParams();
    const Requests = useGetRequestsQuery({id:Number(groupId||1), type:"requests"})
    const data = Requests.data
    const requestsRefetch = Requests.refetch
    const [mutate, result] = useJoinRequestMutation()
    
    function acceptRequest(id:number){
        mutate({id:Number(groupId||1), type:"accept", data:{id:id}});
    }
    useEffect(()=>{
        result.isSuccess && refetch();
        result.isSuccess && requestsRefetch();
    }, [result.isSuccess])

    return (
        <div className="border myp-2 bg-light rounded mt-3">
            <div className="text-first fw-semibold">Requests</div>
            {data && data.map((member:any, index:number)=><div key={index} className="d-flex align-items-center mt-3">
                <div><img src={member.profile_image} className="circle-mini" /></div>
                <Link to={`/profile/${member.id}`}><div className="myfs-mini mx-2 pointer">{member.username}</div></Link>
                <div className="myfs-mini mx-2 pointer text-gray" onClick={()=>{acceptRequest(member.id)}}>+ add</div>
            </div>)}
        </div>
    )
}

interface MemberProps extends Props{
    member: any,
    isAdmin: boolean,
}

function Member({member, refetch, isAdmin}:MemberProps){
    const [isMenu, setIsMenu] = useState(false);
    return <div className="d-flex align-items-center myp-1 position-relative">
        <div><img src={member.profile_image}
        className="circle-mini" /></div>
        <div>
            <Link to={`/profile/${member.id}`}><span className="myfs-mini mx-2 pointer">{member.username}</span></Link>
            {(!member.admin && isAdmin)?<span className="myfs-mini text-gray mx-2 fw-semibold pointer"
            onClick={()=>{setIsMenu(true)}}>I</span>:""}
            {member.admin?<div className="myfs-mini text-first mx-2 fw-semibold">admin</div>:""}
        </div>
        {(isAdmin && isMenu)?<MemberMenu refetch={refetch} userId={member.id} setState={setIsMenu} />:""}
    </div>
}



interface MenuProps extends Props{
    setState: Dispatch<boolean>,
    userId: number,
}

function MemberMenu({refetch, setState, userId}:MenuProps){
    const { groupId } = useParams();
    const eleRef = useRef<HTMLDivElement>(null);
    const [mutate, result] = useJoinRequestMutation();
    
    function adminRequest(type:string){
        mutate({id:Number(groupId||1), type:type, data:{id:userId}});
    }
    
    useEffect(()=>{
        result.isSuccess && refetch();
        result.isSuccess && setState(false);
    }, [result.isSuccess])

    function close(e:Event){
        var target = e.target as HTMLElement;
        if(eleRef.current && !eleRef.current.contains(target)){
            setState(false);
        }
    }
    useEffect(()=>{
        document.addEventListener("click",close);
        return ()=>{document.removeEventListener("click",close)}
    })
    return <div className="position-absolute top-100 start-50 translate-middle-x shadow z-1 bg-white rounded"
            style={{width:"150%"}} ref={eleRef}>
        <div className="pointer myfs-mini myp-1 rounded"
        onMouseEnter={(e:any)=>{(e.currentTarget as HTMLElement).classList.add("bg-gray");}}
        onMouseLeave={(e:any)=>{(e.currentTarget as HTMLElement).classList.remove("bg-gray");}}
        onClick={()=>{adminRequest("setadmin")}}
        >set admin</div>
        <div className="pointer myfs-mini myp-1 rounded mt-1"
        onMouseEnter={(e:any)=>{(e.currentTarget as HTMLElement).classList.add("bg-gray");}}
        onMouseLeave={(e:any)=>{(e.currentTarget as HTMLElement).classList.remove("bg-gray");}}
        onClick={()=>{adminRequest("remove")}}
        >remove</div>
    </div>
}

