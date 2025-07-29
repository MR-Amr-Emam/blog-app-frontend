import { Blog } from "./blog";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Cropper, { ReactCropperElement } from "react-cropper";
import { 
    useChangeUserInfoMutation,
    useGetUserQuery,
    useGetFriendsQuery,
    usePutFriendsMutation
} from "@/state-manage/users-query";

import {useGetGroupsQuery} from "@/state-manage/groups-query";

import { Blog as BlogType } from "@/state-manage/blogs-slice";

import { setRefetch, setSideMenuSelect } from "@/state-manage/profile-page-slice"
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router";
import { Miniblogs, User } from "@/state-manage/user-slice";
import style from "./profile-page.module.css";
import "react-cropper/node_modules/cropperjs/dist/cropper.css"
import { 
    ChatLeftDotsFill,
    PersonPlusFill,
    PersonXFill,
    ArrowLeftShort,
    PenFill,
 } from "react-bootstrap-icons";
import { useGetBlogsQuery } from "@/state-manage/blogs-query";

interface UseStates{
    setIsProfPic: Dispatch<SetStateAction<boolean>>,
}

interface RightSideMenuProps extends UseStates{
    isAuthorized:boolean,
    profileId:number,
    miniblogs: Miniblogs[],
}


export function RightSideMenu(props:RightSideMenuProps){
    const {id} = useParams()
    const userId = useSelector((state:any)=>state.user.id)
    const setIsProfPic = props.setIsProfPic;
    const topBlogsObj = useGetBlogsQuery({id:Number(id||0), type:"top"});
    const dispatch = useDispatch();
    const userDataObj = useGetUserQuery(props.profileId);
    const groupsDataObj = useGetGroupsQuery(Number(id||1));
    const userData = userDataObj.data;
    const friendsDataObj = useGetFriendsQuery(Number(id || 0));
    const months = ["jan", "feb", "march", "april", "may", "jun", "july", "aug", "sep", "oct", "nov", "dec"]
    return (
        <div>
            <div className="w-100">
                <img src={userData?.backgroundImage} className="w-100" style={{aspectRatio:2}} />
            </div>
            <div className="myp-3">
                <div className={`d-flex w-100 align-items-center`}>
                    <div className="mx">
                        <img onClick={()=>{setIsProfPic(true);}} className="circle-1 pointer" src={userData?.profileImage} />
                    </div>
                    <div className="position-relative w-100 mx-3 d-flex align-items-center">
                        <div>{userData?.username}</div>
                        {(props.isAuthorized || props.profileId==0)?
                        <div className="myfs-mini pointer text-gray mx-2" onClick={()=>{dispatch(setSideMenuSelect("edit"))}}><PenFill /></div>
                        :""}
                    </div>
                </div>
                <span className="position-relative myfs-mini text-dark-emphasis mt-2 pointer" onClick={()=>{
                    dispatch(setSideMenuSelect("friends"))
                }}>{userData?.blogsNumber} blogs {friendsDataObj.data?.friends.length} friends
                {(userId==id && friendsDataObj.isSuccess && (friendsDataObj.data.user_requests.length || friendsDataObj.data.friends_requests.length))?
                <div className="position-absolute start-100 bottom-50 myp-1 rounded-circle" style={{backgroundColor:"red"}} />:""}
                </span>
                <div className="myfs"><p>{userData?.bio}</p></div>
                {(props.isAuthorized||props.profileId==0)?"":<FriendBtn />}
                <div>
                    <div className="myfs fw-semibold text-gray">groups</div>
                    {groupsDataObj.isSuccess && groupsDataObj.data.map((group:any, index:number)=>
                    <div key={index} className="d-flex align-items-center mt-3">
                        <div><div style={{
                            width: "calc(1.8 * var(--unit))",
                            height: "calc(1.8 * var(--unit))",
                            backgroundImage: `url(${group.image})`,
                            backgroundSize: "cover",
                            borderRadius: "50%",
                            backgroundPosition: "center",
                        }} /></div>
                        <Link to={`/group/${group.id}`}><div className="myfs-mini mx-2 pointer">{group.name}</div></Link>
                    </div>)}
                </div>
                {userData?<div className="text-dark-emphasis myfs-mini mt-3">
                    joined at {months[new Date(userData.date).getMonth()]} {new Date(userData.date).getFullYear()}
                </div>:""}
                <div className="d-flex myfs-mini mt-2 text-dark"><div className="pointer">instgram</div><div className="mx-3 pointer">linkedin</div></div>
                <div className="mt-3">
                    <div className="fw-semibold text-center myfs-4 mx-3 border-top">top blogs</div>
                        <div className="w-90 position-relative start-50 translate-middle-x">{topBlogsObj.isSuccess && topBlogsObj.data.map((blog:BlogType, index:number)=>
                            <Blog key={blog.id} mini={true} userId={blog.userId} id={blog.id} title={blog.title} views={blog.views}
                            likes={blog.likes} description={blog.description} image={blog.image} date={blog.date} />
                        )}</div>
                </div>
            </div>
        </div>
    )
}

function FriendBtn(){
    const {id} = useParams();
    const [isHide, setIsHide] = useState(true);
    const btnRef = useRef<HTMLDivElement|null>(null);
    const btnValues = [
        [["add friend"], [""]],
        [["friend"], ["message", "unfriend"]],
        [["confirm"], ["remove"]],
        [["remove request"], [""]]
    ];
    const navigate = useNavigate();
    
    /// Data Fetching
    const {data, refetch, isSuccess} = useGetUserQuery(Number(id || 0))
    const [mutate, result] = usePutFriendsMutation()
    useEffect(()=>{
        result.isSuccess && refetch()
    }, [result.isSuccess])

    useEffect(()=>{
        function hide(e:Event){
            var target = e.target as HTMLElement;
            if(btnRef.current && !btnRef.current.contains(target)){
                setIsHide(true)
            }
        }
        !isHide && document.addEventListener("click", hide);
        return ()=>{document.removeEventListener("click", hide);}
    })
    return (
        <div className="position-relative d-flex my-2 myfs-mini text-gray justify-content-between">
                
                <div className="btn btn-first myp-1" style={{width:"70%"}}
                onClick={()=>{
                    data && data.friendStatus!=1 && mutate({id:Number(id||0), method:(data.friendStatus==3?"delete":"put"), friendStatus:data.friendStatus});
                }}>
                {isSuccess?btnValues[data.friendStatus][0][0]:""}
                </div>

                <div className="text-center w-25 rounded myp-1 pointer rounded bg-white border glory"
                onClick={()=>{setIsHide(false)}}>. . .</div>

                {isHide?"":
                <div className="position-absolute top-100 my-1 w-100 bg-white myp-1 border rounded" ref={btnRef}>
                    {isSuccess && btnValues[data.friendStatus][1]?
                    btnValues[data.friendStatus][1].map((ele:any, index:number)=>
                    <div key={index} className="rounded option-select myp-1 pointer"
                    onClick={()=>{
                        ((data.friendStatus==1 && index==1) || (data.friendStatus==2 && index==0))
                        && mutate({id:Number(id||0), method:"delete", friendStatus:data.friendStatus});

                        ((data.friendStatus==1 && index==0)) && navigate(`/chat/${id}`);
                        
                        setIsHide(true);
                    }}
                    >{ele}</div>
                    ):""}
                </div>}

        </div>
    )
}

export function FriendsMenu({setIsProfPic}:{setIsProfPic:any}){
    const {id} = useParams()
    const dispatch = useDispatch();
    const [friendsType, setFriendsType] = useState("friends");
    const friendsTypes = ["friends", "requests", "your requests"];
    
    // data fetching
    const userDataObj = useGetUserQuery(Number(id || 0));
    const userData = userDataObj.data;
    const {data, isSuccess, refetch} = useGetFriendsQuery(Number(id || 0));
    const [mutate, result] = usePutFriendsMutation()
    const [fetchId, setFetchId] = useState(0);

    useEffect(()=>{
        result.isSuccess && refetch();
        result.isSuccess && setFetchId(0);
    }, [result.isSuccess])

    function generateFriend(ele:any, index:number, friendStatus:number){
        return (
            <div key={index} className={`${style["profile-image"]} d-flex align-items-center mb-3 pointer px-2 mt-3`}>
                <div className="mx-2">
                    <img onClick={()=>{setIsProfPic(true);}} className="circle-mini pointer" src={ele.profile_image} />
                </div>
                <div className="mx-2 myfs-mini">
                    <Link to={`/profile/${ele.id}`} onClick={()=>{
                        dispatch(setSideMenuSelect("menu"));
                    }}>{ele.username}</Link>
                </div>
                {friendStatus==1?<><Link to={`/chat/${ele.id}`}><div className="mx-2 myfs-mini text-first pointer"><ChatLeftDotsFill /></div></Link>
                <div className="mx-2 pointer myfs-mini text-danger" onClick={()=>{mutate({id:ele.id, method:"delete", friendStatus:1}); setFetchId(ele.id);}}><PersonXFill /></div></>:""}
                {friendStatus==2?<PersonPlusFill className="mx-2 myfs-mini text-first"
                onClick={()=>{mutate({id:ele.id, method:"put", friendStatus:1 }); setFetchId(ele.id);}} />:""}
                {friendStatus>=2?<PersonXFill className="mx-2 myfs-mini text-danger"
                onClick={()=>{mutate({id:ele.id, method:"delete", friendStatus:1 }); setFetchId(ele.id);}} />:""}
                {(result.isLoading && ele.id==fetchId)&&<div className="spinner-border text-first"
                style={{width:"calc(0.8 * var(--unit))", height:"calc(0.8 * var(--unit))"}} />}
            </div>
        )
    }

    return (
        <div className="myp-3">
            <div className="d-flex align-items-top">
                <div className="myfs fw-bold pointer me-3" onClick={()=>{
                    dispatch(setSideMenuSelect("menu"))
                }}><ArrowLeftShort className="myfs-3" /></div>
                <div>
                    <div className="myfs"><span className="fw-semibold">{userData?.username}</span> friends</div>
                    <div className="myfs-mini text-dark-emphasis">{data.friends.length} friends</div>
                </div>
            </div>
            <div className="d-flex w-100 overflow-hidden">
                {friendsTypes.map((ele, index)=>
                <div key={index} className={`${friendsType==ele?"focused":""} option-select pointer mx-2 myp-1 myfs-mini rounded position-relative`}
                onClick={()=>{setFriendsType(ele)}}>
                    {ele}
                    {((index==1 && isSuccess && data.friends_requests.length) || (index==2 && isSuccess && data.user_requests.length))?
                    <div className="position-absolute bottom-50 start-100 myp-1 rounded-circle" style={{backgroundColor:"red"}} />:""}
                </div>
                )}
            </div>
            {isSuccess && friendsType=="friends" && data.friends.map((ele:any, index:number)=>generateFriend(ele, index, 1))}
            {isSuccess && friendsType=="requests" && data.friends_requests.map((ele:any, index:number)=>generateFriend(ele, index, 2))}
            {isSuccess && friendsType=="your requests" && data.user_requests.map((ele:any, index:number)=>generateFriend(ele, index, 3))}
        </div>
    )
}

export interface UserDataEdit extends User{
    profileBlob?: Blob,
    backgroundBlob?: Blob,
}

interface EditProps{
    setUserDataEdit:Dispatch<SetStateAction<UserDataEdit|undefined>>,
    setEditPic:Dispatch<SetStateAction<string>>,
    userDataEdit:UserDataEdit,
}

interface EditMenuProps extends EditProps{
}

interface EditProfilePicProps extends EditProps{
    profile:boolean,
    url:string,
}




export function EditMenu(props:EditMenuProps){
    const [mutate, result] = useChangeUserInfoMutation();
    const userId = useSelector((state:any)=>state.user.id);
    const dispatch = useDispatch()

    useEffect(()=>{
        if(result.isSuccess){
            dispatch(setRefetch(true));
            dispatch(setSideMenuSelect("menu"));
        }
    }, [result.isSuccess])
    

    function applyChanges(){
        var {username, bio} = props.userDataEdit;
        var userData:any = {
            username: username,
            bio: bio,
        }
        if(props.userDataEdit.profileBlob){
            var file = new File([props.userDataEdit.profileBlob], `${userData.username}-profile.jpg`)
            userData.profile_image = file
        }
        if(props.userDataEdit.backgroundBlob){
            var file = new File([props.userDataEdit.backgroundBlob], `${userData.username}-background.jpg`)
            userData.background_image = file;
        }
        mutate({id:userId, data:userData});
    }

    return (
        <div className="myp-3">
            <div className="d-flex align-items-center mb-3">
                <div className="myfs-3 fw-bold pointer me-3" onClick={()=>{
                    dispatch(setSideMenuSelect("menu"));
                    }}><ArrowLeftShort /></div>
                <div className="fw-semibold">edit profile</div>
            </div>
            <div className="mb-3">
                <p className="fw-medium pointer">cover image</p>
                <div className="position-relative">
                    <img src={props.userDataEdit?.backgroundImage} onClick={()=>{props.setEditPic("background")}}
                    className="w-100 pointer" style={{aspectRatio:2}} />
                </div>
            </div>
            <div className="mb-3">
                <p className="fw-medium">profile image</p>
                <div className="position-relative start-50 translate-middle-x w-30">
                    <img src={props.userDataEdit?.profileImage} onClick={()=>{props.setEditPic("profile")}}
                    className="circle-full pointer"/>
                </div>
            </div>
            <div className="mb-3">
                <div className="fw-medium">username</div>
                <input type="text" value={props.userDataEdit?.username} className="myinput bg-gray myfs-mini text-gray"
                onChange={(e)=>{props.setUserDataEdit({...props.userDataEdit, username:e.target.value})}} />
            </div>
            <div className="mb-3">
                <div className="fw-medium">bio</div>
                <input type="text" value={props.userDataEdit?.bio || ""} className="myinput bg-gray myfs-mini text-gray"
                onChange={(e)=>{props.setUserDataEdit({...props.userDataEdit, bio:e.target.value})}} />
            </div>
            <div className="mb-3">
                <button className="btn btn-success w-100" onClick={applyChanges}>apply changes</button>
            </div>
            {result.isLoading && <div className="d-flex justify-content-center">
                <div className="spinner-border text-first" />
            </div>}
        </div>
    )
}


export function EditProfilePic(props:EditProfilePicProps){
    const editRef = useRef(null);
    const pageRef = useRef(null);
    const imageInputRef = useRef(null);
    const imageRef = useRef(null);
    const cropperRef = useRef<ReactCropperElement>(null);
    const [cropUrl, setCropUrl] = useState("");
    const [imageUrl, setImageUrl] = useState(props.url);
    const [isCropped, setIsCropped] = useState(false);

    function closePic(e:Event){
        var target = e.target;
        if(editRef.current && !((editRef.current as HTMLElement).contains(target as HTMLElement)) && imageInputRef.current){
            props.setEditPic("")
            setCropUrl("");
        }
    }

    function chooseImage(e:Event){
        var inputEle = e.currentTarget as HTMLInputElement;
        if(inputEle.files){
            var image = inputEle.files[0];
            var url = URL.createObjectURL(image);
            setCropUrl(url);
            setIsCropped(false);
        }
    }

    function cropImage(){
        var url = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
        if(imageInputRef.current){
            var inputEle = imageInputRef.current as HTMLInputElement;
            inputEle.value = "";
        }
        setImageUrl(url || "");
        setCropUrl("");
        setIsCropped(true);
    }

    async function applyCrop(){
        if(imageRef.current){
            var response = await fetch((imageRef.current as HTMLImageElement).src);
            var blob = await response.blob();
            if(props.profile){
                props.userDataEdit && props.setUserDataEdit({...props.userDataEdit, profileImage:imageUrl, profileBlob:blob})
            }else{
                props.userDataEdit && props.setUserDataEdit({...props.userDataEdit, backgroundImage:imageUrl, backgroundBlob:blob})
            }
            props.setEditPic("")
        }
    }

    useEffect(()=>{
        pageRef.current?(pageRef.current as HTMLElement).addEventListener("click",closePic):"";
        imageInputRef.current?(imageInputRef.current as HTMLElement).addEventListener("change", chooseImage):"";

        return ()=>{
            pageRef.current?(pageRef.current as HTMLElement).removeEventListener("click",closePic):"";
            imageInputRef.current?(imageInputRef.current as HTMLElement).removeEventListener("change", chooseImage):"";
            
        }
    })

    return(
        <div className={`blured overflow-y-scroll`}
        ref={pageRef}>
            <div className="w-50 position-absolute start-50 top-50 translate-middle myp-2 border rounded bg-light" ref={editRef}>
                <p className="text-center myfs-4 fw-semibold">edit profile image</p>
                <div className="mb-3">
                    {cropUrl?"":<img ref={imageRef} src={imageUrl} className="w-100" style={{maxHeight:"70vh"}} />}
                    {cropUrl && <Cropper ref={cropperRef} src={cropUrl}
                    aspectRatio={props.profile?1:2} zoomable={false} disabled={true} rotatable={true}
                    background={true} viewMode={2} className="w-100" style={{maxHeight:"70vh"}} /> }
                </div>
                <div>
                    <div className="d-flex justify-content-between">
                        <label htmlFor="choose-image" className="btn btn-first rounded-0">&#8686; choose image</label>
                        <input ref={imageInputRef} type="file" id="choose-image" className="d-none" />
                        {cropUrl && <button className="btn btn-success" onClick={cropImage}>crop</button>}
                        {isCropped?<button className="btn btn-success" onClick={applyCrop}>apply</button>:""}
                    </div>
                </div>
            </div>
        </div>
    )
}