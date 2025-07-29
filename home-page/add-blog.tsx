import { Dispatch, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { Cropper } from "react-cropper";

import { useDispatch } from "react-redux";
import { setBlogSubmitted } from "@/state-manage/user-slice";

import { useSubmitBlogMutation, useGetCategorysQuery } from "@/state-manage/blogs-query";
interface Props{
    setAddBlog:Dispatch<boolean>,
    group_id?:number,
}

export function AddBlog(props:Props){
    const [blogType, setBlogType] = useState("blog");
    const [blogCat, setBlogCat] = useState(0);
    const eleRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch()
    const [focusedImg, setFocusedImg] = useState("");
    const [blogContents, setBlogContents] = useState<string[]>(["", ""]);
    const [blogImgs, setBlogImgs] = useState<(File|null)[]>([]);
    const [imgsUrls, setImgsUrls] = useState<(string|undefined)[]>([]);
    const [videoUpload, setVideoUpload] = useState<(File|null)>();
    const [imgIndex, setImgIndex] = useState(0);
    const [sectionsNum, setSectionsNum] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [clicked, setClicked] = useState(false);

    const [mutate, result] = useSubmitBlogMutation();
    const categories = useGetCategorysQuery();

    const {id, username, profileImage} = useSelector((state:any)=>({
        id:state.user.id,
        username:state.user.username,
        profileImage:state.user.profileImage,
    }))

    function submitBlog(){
        var sections = [];
        for(let i=2; i<sectionsNum+2; i++){
            sections.push({image: "image-"+(i-1), content:blogContents[i]});
        }
        var data = {
            category:blogCat||null,
            is_video:blogType=="video"?true:false,
            image:"image-0",
            title:blogContents[0],
            description:blogContents[1],
            section_set: sections,
            for_group: props.group_id?true:false,
            group: props.group_id?props.group_id:null,
        }

        var data_json = JSON.stringify(data)
        var formData = new FormData()
        formData.append("data", data_json)
        blogImgs[0] && formData.append("image-0", blogImgs[0]);
        blogType=="video" && videoUpload && formData.append("video", videoUpload);
        for(let i=1; i<sectionsNum+1; i++){
            blogImgs[i] && formData.append("image-"+i, blogImgs[i] as File);
        }
        !result.isLoading && mutate(formData);
        setClicked(true)
    }

    useEffect(()=>{
        (!result.isLoading && result.isSuccess) && props.setAddBlog(false);
        (!result.isLoading && result.isSuccess) && dispatch(setBlogSubmitted(true));
        !result.isLoading && !result.isSuccess && clicked && setErrorMsg("fill fields properly");
        result.isLoading && setErrorMsg("");
    }, [result.isSuccess, result.isLoading])

    useEffect(()=>{
        function close(e:Event){
            var target = e.target as HTMLElement;
            var ele = eleRef.current;
            ele && !ele.contains(target) && props.setAddBlog(false);
        }
        !focusedImg && document.addEventListener("click", close);
        focusedImg && document.removeEventListener("click", close);
        return ()=>{document.removeEventListener("click", close);}
    })

    useEffect(()=>{
        var urls = blogImgs.map((img:File|null)=>img?URL.createObjectURL(img):undefined)
        setImgsUrls(urls);
    }, [imgIndex])

    return(
        <div className="blured overflow-y-scroll">
            {(focusedImg && imgIndex)?<CropPic
            url={focusedImg}
            setFocusedImg={setFocusedImg}
            blogImgs={blogImgs}
            setBlogImgs={setBlogImgs}
            imgIndex={imgIndex}
            setImgIndex={setImgIndex}
            />:""}
            <div ref={eleRef} className="myp-3 bg-light rounded myfs text-gray w-75
            position-absolute start-50 translate-middle-x" style={{top:"10%"}}>
                {result.isLoading?<div className="w-100 h-100 blured"></div>:""}
                <div>
                    <div className="d-flex align-items-top mb-3">
                        <div><Link to={`/profile/${id}/`}><img className="circle-1" src={profileImage} /></Link></div>
                        <div className="myfs text-dark mx-2">
                            <div className="fw-semibold">{username}</div>
                            <div className="text-gray">add Blog</div>
                        </div>
                        <div className="text-danger mx-3">{errorMsg}</div>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="d-flex mb-3">
                        <div className="me-3">
                            <p className="myfs fw-semibold">Blog Type</p>
                            <div className="d-flex">
                                <div className={`myp-1 me-2 option-select pointer rounded border
                                ${blogType=="blog"?"focused":""}`} onClick={()=>{setBlogType("blog")}}>blog</div>
                                <div className={`myp-1 ms2 option-select pointer rounded border
                                ${blogType=="video"?"focused":""}`} onClick={()=>{setBlogType("video")}}>video</div>
                            </div>
                        </div>
                        <div className="ms-3">
                            <p className="myfs fw-semibold">Category <span className="text-dark mx-2" onClick={()=>{setBlogCat(0)}}>cancel</span></p>
                            <div className="d-flex">
                                {categories.isSuccess && categories.data.map((category:any, index:number)=>
                                <div key={index} className={`myp-1 me-2 option-select pointer rounded border
                                ${blogCat==category.id?"focused":""}`} onClick={()=>{setBlogCat(category.id)}}>{category.category}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {imgsUrls[0]?<div><img src={imgsUrls[0]} className="w-100 rounded" style={{aspectRatio:2}} /></div>:""}
                    <div className="mb-3 d-flex align-items-end justify-content-between">
                        <div className="w-100">
                            <label htmlFor="cover-image" className="form-label myfs text-gray">choose cover image</label>
                            <input id="cover-image" type="file" className="form-control rounded-0" onClick={(e)=>{e.currentTarget.value=""}} onChange={(e)=>{
                                var inputEle = e.currentTarget;
                                var image = inputEle.files && inputEle.files[0];
                                image && setFocusedImg(URL.createObjectURL(image));
                                image && setImgIndex(1);
                            }} />
                        </div>
                        {blogType=="video"?<div className="w-25 ms-2">
                            <label htmlFor={`video`} className="btn btn-secondary rounded-0 pointer myfs-mini">&#8686; choose video</label>
                            <input id={`video`} type="file" className="d-none" onChange={(e)=>{
                            var inputEle = e.currentTarget as HTMLInputElement;
                            var video = inputEle.files && inputEle.files[0];
                            video && setVideoUpload(video);
                            inputEle.value = "";}} />
                        </div>:""}
                    </div>
                    <div className="mb-3">
                        <div>title</div>
                        <input type="text" className="myinput w-100 text-gray" onChange={(e)=>{
                            blogContents[0] = e.currentTarget.value;
                            setBlogContents(blogContents);
                        }} />
                    </div>
                    <div className="mb-3">
                        <div>description</div>
                        <input type="text" className="myinput w-100 text-gray" onChange={(e)=>{
                            blogContents[1] = e.currentTarget.value;
                            setBlogContents(blogContents);
                        }} />
                    </div>
                    {blogType=="blog"?
                    <>{range(sectionsNum).map((ele, index)=>
                    <Section key={index} index={index}
                    setFocusedImg={setFocusedImg}
                    blogImgs={blogImgs}
                    imgsUrls={imgsUrls}
                    setBlogImgs={setBlogImgs}
                    imgIndex={imgIndex}
                    setImgIndex={setImgIndex}
                    blogContents={blogContents}
                    setBlogContents={setBlogContents}/>)}
                            
                    <div className="mb-3">
                        <button className="btn text-gray fw-semibold" onClick={()=>{
                            setSectionsNum(sectionsNum+1);
                            }}>+ add section</button>
                    </div></>:""}
                    <div>
                        <button className="btn btn-success myfs-mini w-100" onClick={()=>{submitBlog()}}>submit blog</button>
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

interface SectionProps extends MainProps{
    index:number,
    imgsUrls: (string|undefined)[],
    blogContents: string[],
    setBlogContents: Dispatch<string[]>,

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
                    ref={cropperRef} aspectRatio={2} zoomable={false} disabled={true}
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


function Section(props:SectionProps){
    const img = props.imgsUrls;
    const index = props.index + 1;
    return (
        <div className="mb-3">
            <p className="myfs-4 fw-semibold">part {props.index+1}</p>
            {img[index]?
                <div className="myp-2">
                <img src={ img[index]}
                className="w-100 rounded" style={{aspectRatio:2}} />
            </div>:""}
            <div className="mb-3">
                <label htmlFor={`image-section-${props.index+1}`} className="btn btn-secondary rounded-0 pointer myfs-mini">&#8686; choose image</label>
                <input id={`image-section-${props.index+1}`} type="file" className="d-none" onChange={(e)=>{
                    var inputEle = e.currentTarget as HTMLInputElement;
                    var image = inputEle.files && inputEle.files[0];
                    image && props.setFocusedImg(URL.createObjectURL(image));
                    image && props.setImgIndex(props.index+2);
                    inputEle.value = "";}} />
            </div>
            <div className="mb-3">
                <textarea placeholder="what is on your mind..." className="myinput text-gray w-100" onChange={(e)=>{
                    props.blogContents[index+1] = e.currentTarget.value;
                    props.setBlogContents(props.blogContents);}} />
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