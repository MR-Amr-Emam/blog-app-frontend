import { Dispatch, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { Cropper } from "react-cropper";

import { setBlogSubmitted } from "@/state-manage/user-slice";
import { useCreateGroupMutation, useEditGroupMutation } from "@/state-manage/groups-query";
interface Props{
    setCreateGroup:Dispatch<boolean>,
    initialData?:any,
}

export function CreateGroup({setCreateGroup, initialData}:Props){
    const eleRef = useRef<HTMLDivElement | null>(null);
    const [focusedImg, setFocusedImg] = useState("");
    const [groupContents, setGroupContents] = useState<string[]>(["", ""]);
    const [groupImgs, setGroupImgs] = useState<(File|null)[]>([]);
    const [imgsUrls, setImgsUrls] = useState<(string|undefined)[]>([]);
    const [imgIndex, setImgIndex] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [clicked, setClicked] = useState(false);
    const dispatch = useDispatch()
    
    const [mutateCreate, resultCreate] = useCreateGroupMutation();
    const [mutateEdit, resultEdit] = useEditGroupMutation();

    const {id, username, profileImage} = useSelector((state:any)=>({
        id:state.user.id,
        username:state.user.username,
        profileImage:state.user.profileImage,
    }))

    function createGroup(){
        var data = {
            image:"image-0",
            name:groupContents[0],
            description:groupContents[1],
        }

        var data_json = JSON.stringify(data)
        var formData = new FormData()
        formData.append("data", data_json)
        groupImgs[0] && formData.append("image-0", groupImgs[0]);
        !resultEdit.isLoading && initialData && mutateEdit({formData,id:initialData.id});
        !resultCreate.isLoading && !initialData && mutateCreate(formData);
        setClicked(true);
    }
    
    useEffect(()=>{
        if((!resultCreate.isLoading && resultCreate.isSuccess)
        ||(!resultEdit.isLoading && resultEdit.isSuccess)){setCreateGroup(false); dispatch(setBlogSubmitted(true));}

        (resultCreate.isLoading || resultEdit.isLoading) && setErrorMsg("");
        
        ((!initialData && !resultCreate.isLoading && clicked) ||
        (initialData && !resultEdit.isLoading && clicked)) && setErrorMsg("fill fields properly");
    
    }, [resultCreate.isLoading,
        resultEdit.isLoading,])

    useEffect(()=>{
        function close(e:Event){
            var target = e.target as HTMLElement;
            var ele = eleRef.current;
            ele && !ele.contains(target) && setCreateGroup(false);
        }
        !focusedImg && document.addEventListener("click", close);
        focusedImg && document.removeEventListener("click", close);
        return ()=>{document.removeEventListener("click", close);}
    })


    useEffect(()=>{
        var urls = groupImgs.map((img:File|null)=>img?URL.createObjectURL(img):undefined)
        setImgsUrls(urls);
    }, [imgIndex])

    useEffect(()=>{
        if(initialData){
            setGroupContents([initialData.name, initialData.description])
            fetch(initialData.image).then((res)=>res.blob()).then((blob)=>{
                var file = new File([blob], "image-1.jpg")
                setGroupImgs([file])
            })
        }
    }, [])
    
    return(
        <div className="blured overflow-y-scroll">
            {(focusedImg && imgIndex)?<CropPic
            url={focusedImg}
            setFocusedImg={setFocusedImg}
            blogImgs={groupImgs}
            setBlogImgs={setGroupImgs}
            imgIndex={imgIndex}
            setImgIndex={setImgIndex}
            />:""}
            <div ref={eleRef} className="myp-3 bg-light rounded myfs text-gray w-75
            position-absolute start-50 translate-middle-x" style={{top:"10%"}}>
                {(resultEdit.isLoading || resultCreate.isLoading)?<div className="w-100 h-100 blured" />:""}
                <div>
                    <div className="d-flex align-items-top mb-3">
                        <div><Link to={`/profile/${id}/`}><img className="circle-1" src={profileImage} /></Link></div>
                        <div className="myfs text-dark mx-2">
                            <div className="fw-semibold">{username}</div>
                            <div className="text-gray">
                                {initialData?"edit group":"create group"}
                            </div>
                        </div>
                        <div className="text-danger mx-3">{errorMsg}</div>
                    </div>
                </div>
                <div>
                    {(imgsUrls[0] || (initialData && initialData.image))?<div>
                        <img src={imgsUrls[0] || initialData.image} className="w-100 rounded ratio-3" />
                    </div>:""}
                    <div className="mb-3 d-flex align-items-end justify-content-between">
                        <div className="w-100">
                            <label htmlFor="cover-image" className="form-label myfs text-gray">choose cover image</label>
                            <input id="cover-image" type="file" className="form-control rounded-0" onClick={(e)=>{
                                var inputEle = e.currentTarget;
                                inputEle.value = "";
                            }} onChange={(e)=>{
                                var inputEle = e.currentTarget;
                                var image = inputEle.files && inputEle.files[0];
                                image && setFocusedImg(URL.createObjectURL(image));
                                image && setImgIndex(1);
                            }} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div>name</div>
                        <input type="text" className="myinput w-100 text-gray"
                            value={groupContents[0]?groupContents[0]:""}
                            onChange={(e)=>{
                            groupContents[0] = e.currentTarget.value;
                            setGroupContents(groupContents);
                        }} />
                    </div>
                    <div className="mb-3">
                        <div>description</div>
                        <input type="text" className="myinput w-100 text-gray" 
                            value={groupContents[1]?groupContents[1]:""}
                            onChange={(e)=>{
                            groupContents[1] = e.currentTarget.value;
                            setGroupContents(groupContents);
                        }} />
                    </div>
                    <div>
                        <button className="btn btn-success myfs-mini w-100" onClick={()=>{createGroup()}}>
                            {initialData?"edit group":"create group"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface MainProps{
    setFocusedImg:Dispatch<string>,
    blogImgs:(File|null)[],
    setBlogImgs:Dispatch<(File|null)[]>,
    imgIndex:number,
    setImgIndex:Dispatch<number>,
}

interface CropPicProps extends MainProps{
    url:string,
}


function CropPic({url, setFocusedImg, blogImgs, setBlogImgs, imgIndex, setImgIndex}:CropPicProps){
    const cropperRef = useRef<any>(null);

    function crop(){
        if(cropperRef.current){
            cropperRef.current.cropper.getCroppedCanvas() &&
            cropperRef.current.cropper.getCroppedCanvas().toBlob((blob:Blob)=>{
                var img_file = new File([blob], `image-${imgIndex}.jpg`) as File
                blogImgs[imgIndex-1] = img_file;
                setBlogImgs(blogImgs);
                setFocusedImg("");
                setImgIndex(0);
            });
        }
    }

    return(
        <div className="blured z-2">
            <div className="position-absolute start-50 translate-middle-x bg-light myp-3 rounded w-50" style={{top:"10%"}}>
                <div className="text-end pointer myfs pointer" onClick={()=>{setFocusedImg("");setImgIndex(0);}}>x</div>
                <div className="mb-3 w-100">
                    <Cropper className="w-100" src={url}
                    ref={cropperRef} aspectRatio={3} zoomable={false} disabled={true}
                    rotatable={true} background={true} viewMode={2} style={{maxHeight:"70vh"}} />
                </div>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-secondary rounded-0">change image</button>
                    <button className="btn btn-first" onClick={()=>{crop()}}>crop</button>
                </div>
            </div>
        </div>
    )
}


function range(num:number):number[]{
    var ans = [];
    for(let i=0; i<num; i++){
        ans.push(i)
    }
    return ans;
}