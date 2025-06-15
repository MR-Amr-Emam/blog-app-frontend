import { useSelector } from "react-redux";
import { Blog } from "./blog";
import { NavBar } from "@/app/navbar";
import { MiniNavbar } from "./mini-navbar";
import { RightSideMenu } from "./right-side-menu";
import { LeftSideMenu } from "./left-side-menu";
import { useEffect, useRef } from "react";

export default function HomePage(){
    const username = useSelector((state:any)=> state.users[0].username);
    const miniblogs = useSelector((state:any)=>state.users[0].miniblogs);
    const topHeader = useRef(null);
    const pageBody = useRef(null);

    useEffect(()=>{
        if(topHeader.current && pageBody.current){
            var header = topHeader.current as HTMLElement;
            var body = pageBody.current as HTMLElement;
            body.style.top = header.offsetHeight.toString() + "px";
        }
    })

    return (
        <div>
            <div ref={topHeader} className="position-fixed w-100 z-1">
                <NavBar />
                <MiniNavbar />
            </div>
            <div className="row position-relative m-0" ref={pageBody}>
                <div className="col-3 ps-0">
                    <div className="position-fixed h-full w-25"><LeftSideMenu /></div>
                </div>
                <div className="col-6">
                    <div className="w-100 position-relative start-50 translate-middle-x">
                    {miniblogs.map((blog:any, index:number)=><Blog key={index} id={blog.id} username={username} date={blog.date} image={blog.image} title={blog.title} description={blog.description} />)}
                    </div>
                </div>
                <div className="col-3 d-flex flex-row-reverse pe-0">
                    <div className="position-fixed h-full w-25"><RightSideMenu /></div>
                </div>
            </div>
        </div>
    )
}