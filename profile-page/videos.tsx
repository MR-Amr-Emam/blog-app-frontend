import style from "./profile-page.module.css";
import { useEffect, useRef, useState, Dispatch } from "react";

import { Blog } from "@/state-manage/blogs-slice";
import { useParams } from "react-router";
import {useGetBlogsQuery} from "@/state-manage/blogs-query";

export function Videos(probs:any){
    const {id} = useParams();
    const {data, isSuccess} = useGetBlogsQuery({id:Number(id||0), type:"video"});
    const [currentVideo, setCurrentVideo] = useState(0);
    const videoRef = useRef(null);
    
    function nextVideo(){
        if(isSuccess && data && videoRef.current){
            var nextVideo = currentVideo;
            nextVideo ++;
            if(nextVideo>=data.length){
                nextVideo = 0;
            }
            setCurrentVideo(nextVideo);
        };
    }
    
    useEffect(()=>{
        var videoEle:any;
        if(videoRef.current){
            videoEle = videoRef.current as HTMLElement;
            videoEle.addEventListener("ended", nextVideo);
        }
        return ()=>{videoEle && videoEle.removeEventListener("ended", nextVideo)};
    })
    return (
        <div>
            <div className="position-relative m-2 mb-3">
                {isSuccess?<div className="w-90 position-relative start-50 translate-middle-x">
                    <video src={data && data[currentVideo].video} ref={videoRef} autoPlay muted className="w-100" />
                    <div className={`myfs-mini text-dark-emphasis`}>
                        {data[currentVideo].views} views {data[currentVideo].likes} likes
                    </div>
                    <p className="myfs text-first">{data[currentVideo].title}</p>
                    <p className="myfs">{data[currentVideo].description}</p>
                </div>:""}
            </div>
            <div className={`m-2`}>
                <div className={`${style["videos-container"]}
                w-90 position-relative start-50 translate-middle-x overflow-x-scroll`}>
                    {data && data.map((ele, index)=>{
                        return <VideoContainer key={index} blog={ele} setCurrentVideo={setCurrentVideo} />
                    })}
                </div>
            </div>
        </div>
    )
}


interface Props{
    blog: Blog,
    setCurrentVideo:Dispatch<number>;
}

export function VideoContainer({blog, setCurrentVideo}:Props){

    const videoContainerRef = useRef(null);

    useEffect(()=>{
        if(videoContainerRef.current){
            var changeVideo = ()=>{
                setCurrentVideo(blog.id);
            }
            var videoEle = videoContainerRef.current as HTMLElement;
            videoEle.addEventListener("click", changeVideo);
        }
        return ()=>{videoEle.removeEventListener("click", changeVideo)}
    })

    return (
        <div className={`${style["video-container"]} shadow`} ref={videoContainerRef}>
            <div>
                <div className="position-relative">
                    <img src={blog.image} className="w-100 ratio-2" />
                    <div className={`${style["video-active"]} position-absolute w-100 h-100 start-0 top-0
                    bg-black`}></div>
                </div>
            </div>
            <div className="myp-1">
                <div className={`myfs-mini text-dark-emphasis`}>{blog.views} views {blog.likes} likes</div>
                <p className="myfs-mini text-first">{blog.title}</p>
            </div>
        </div>
    )
}