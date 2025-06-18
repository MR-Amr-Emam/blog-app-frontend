import { VideoContainer } from "./video_container"
import style from "./profile-page.module.css"
import { useEffect, useRef, useState } from "react"

export function Videos(probs:any){
    const videos = [
        {title:"that is video 1", url:"http://localhost:3000/hippo.mp4"},
        {title:"that is video 2", url:"https://www.w3schools.com/html/mov_bbb.mp4"},
        {title:"that is video 3", url:"http://localhost:3000/hippo.mp4"},
        {title:"that is video 4", url:"https://www.w3schools.com/html/mov_bbb.mp4"},
    ]
    const [currentVideo, setCurrentVideo] = useState(0);
    const videoRef = useRef(null);
    useEffect(()=>{
        if(videoRef.current){
            var nextVideo = ()=>{
                var nextVideo = currentVideo;
                nextVideo ++;
                if(nextVideo>=videos.length){
                    nextVideo = 0;
                }
                setCurrentVideo(nextVideo);
            };
            var videoEle = videoRef.current as HTMLElement;
            videoEle.addEventListener("ended", nextVideo);
        }
        return ()=>{videoEle.removeEventListener("ended", nextVideo)};
    })
    return (
        <div>
            <div className="position-relative m-2 mb-3">
                <div className="w-90 position-relative start-50 translate-middle-x">
                    <video src={videos[currentVideo].url} ref={videoRef} autoPlay muted className="w-100" />
                    <div className={`myfs-mini text-dark-emphasis`}>123 views 23 likes</div>
                    <p className="myfs">{videos[currentVideo].title}</p>
                </div>
            </div>
            <div className={`m-2`}>
                <div className={`${style["videos-container"]}
                w-90 position-relative start-50 translate-middle-x overflow-x-scroll`}>
                    {videos.map((ele, index)=>{
                        return <VideoContainer key={index} id={index} title={ele.title} url={ele.url} setCurrentVideo={setCurrentVideo} />
                    })}
                </div>
            </div>
        </div>
    )
}