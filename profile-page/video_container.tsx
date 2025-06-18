import { useEffect, useRef } from "react";
import { Dispatch, SetStateAction } from "react";
import style from "./profile-page.module.css"

interface Props{
    id: number;
    title: string;
    url: string;
    setCurrentVideo:Dispatch<SetStateAction<number>>;
}

export function VideoContainer(props:Props){

    const videoContainerRef = useRef(null);

    useEffect(()=>{
        if(videoContainerRef.current){
            var changeVideo = ()=>{
                props.setCurrentVideo(props.id);
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
                    <img src="https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"
                    className="w-100" />
                    <div className={`${style["video-active"]} position-absolute w-100 h-100 start-0 top-0
                    bg-black`}></div>
                </div>
            </div>
            <div className="myp-1">
                <div className={`myfs-mini text-dark-emphasis`}>123 views 23 likes</div>
                <p className="myfs-mini">{props.title}</p>
            </div>
        </div>
    )
}