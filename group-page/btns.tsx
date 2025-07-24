import { useParams } from "react-router";

import { useGetFriendsQuery } from "@/state-manage/users-query";
import { useJoinRequestMutation, useGetGroupQuery } from "@/state-manage/groups-query";
import { Dispatch, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

interface Props{
    setEditGroup: Dispatch<boolean>,
    refetch: any,
}

export function Btns({setEditGroup, refetch}:Props){
    const {groupId} = useParams();
    const [joinMutate, joinResult] = useJoinRequestMutation();
    const {data} = useGetGroupQuery(Number(groupId||1));
    const [isInvites, setIsInvites] = useState(false);

    useEffect(()=>{
        joinResult.isSuccess && refetch();
    }, [joinResult.isSuccess])

    function joinGroup(){
            joinMutate({id:Number(groupId||1), type:"join"});
        }
    
        function leaveGroup(){
            joinMutate({id:Number(groupId||1), type:"leave"});
        }
    
    if(data) return (
        <div className="d-flex">
            {data.user_status==0?<button className="btn btn-secondary mx-2 myfs-mini"
            onClick={()=>{joinGroup()}}>join</button>:""}
            {data.user_status==1?<button className="btn btn-secondary mx-2 myfs-mini"
            onClick={()=>{leaveGroup()}}>cancel request</button>:""}
            {data.user_status>=2?<button className="btn btn-secondary mx-2 myfs-mini position-relative"
            onClick={()=>{setIsInvites(true)}}>
                <span>invite</span>
                {isInvites?<InviteMenu refetch={refetch} setState={setIsInvites} />:""}
            </button>:""}
            {data.user_status==2?<button className="btn btn-secondary mx-2 myfs-mini"
            onClick={()=>{leaveGroup()}}>leave group</button>:""}
            {data.user_status==3?<button className="btn btn-secondary mx-2 myfs-mini" onClick={()=>{setEditGroup(true)}}>edit</button>:""}
        </div>
    )
    else return <></>
}


interface InviteProps {
    refetch: any,
    setState: Dispatch<boolean>,
}


function InviteMenu({refetch, setState}:InviteProps){
    const { groupId } = useParams();
    const eleRef = useRef<HTMLDivElement>(null);
    const [invites, setInvites] = useState<number[]>([]);
    const [mutate, result] = useJoinRequestMutation();
    const userId = useSelector((state:any)=>state.user.id)
    const {data, isSuccess} = useGetFriendsQuery(userId)
    
    function inviteRequest(){
        mutate({id:Number(groupId||1), type:"invite", data:{ids:invites}});
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
            style={{width:"250%"}} ref={eleRef}>
        
        <div className="overflow-y-scroll" style={{maxHeight:"25vh"}}>
        {isSuccess && data.friends.map((friend:any, index:number)=>
        <div key={index} className="pointer myfs-mini myp-1 rounded d-flex align-items-center"
        onMouseEnter={(e:any)=>{(e.currentTarget as HTMLElement).classList.add("bg-gray");}}
        onMouseLeave={(e:any)=>{!invites.includes(friend.id)&&(e.currentTarget as HTMLElement).classList.remove("bg-gray");}}
        onClick={()=>{
            let temp;
            if(invites.includes(friend.id)){
                temp = invites.filter((num)=>num!=friend.id)
            }else{
                temp = [...invites, friend.id]
            }
            setInvites(temp);
        }}
        >
            <div><img className="circle-mini" src={friend.profile_image} /></div>
            <div className="mx-2 myfs-mini text-dark">{friend.username}</div>
        </div>)}
        <div className="myfs-mini myp-1 text-dark" onClick={()=>{inviteRequest()}}>+ invite</div>
        </div>
    </div>
}