import { useSelector } from "react-redux";
import { Blog } from "@/home-page/blog";
import { useRef, useEffect } from "react";

import { NavBar } from "@/app/navbar"


export function GroupPage(){
    const username = useSelector((state:any)=> state.users[0].username);
    const miniblogs = useSelector((state:any)=>state.users[0].miniblogs);
    const topHeader = useRef(null);
    const pageBody = useRef(null);
    const members = ["ali", "amr", "medo", "areej"];
    
    
    useEffect(()=>{
        if(topHeader.current && pageBody.current){
            var header = topHeader.current as HTMLElement;
            var body = pageBody.current as HTMLElement;
            body.style.top = header.offsetHeight.toString() + "px";
        }
    })

    return (
        <div>
            <div className="position-fixed w-100 z-1" ref={topHeader}>
                <NavBar />
            </div>
            <div className="position-relative" ref={pageBody}>
                <div className="position-relative">
                    <div className="position-relative start-50 translate-middle-x w-90">
                        <div>
                            <img src="https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"
                            className="w-100 rounded-bottom ratio ratio-21x9" style={{aspectRatio:3}} />
                        </div>
                        <div className="w-90 position-relative start-50 translate-middle-x myfs fw-semibold bg-light myp-2 rounded-bottom">
                            <p className="text-first myfs-2">that is a group</p>
                            <div className="fw-semibold text-dark-emphasis">115 members</div>
                            <div className="d-flex">
                                {members.map((friend:string, index:number)=>{
                                    return(
                                        <div key={index} className="d-flex align-items-center myp-1">
                                            <div><img src="https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"
                                            className="circle-mini" /></div>
                                            <div className="myfs-mini mx-2">{friend}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-50 position-relative start-50 translate-middle-x">
                    {miniblogs.map((blog:any, index:number)=><Blog key={index} id={blog.id} username={username} date={blog.date} image={blog.image} title={blog.title} description={blog.description} />)}
                </div>
            </div>
        </div>
    )
}