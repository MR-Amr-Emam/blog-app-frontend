import { useEffect, useRef } from "react"

import { NavBar } from "@/app/navbar";
import { Blog } from "./blog";
import { SideMenu } from "./side-menu";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { useGetBlogQuery } from "@/state-manage/blogs-query";

export default function BlogPage(){
    const {id} = useParams();
    const topHeader = useRef<any>(null);
    const pageBody = useRef(null);
    const {data, isSuccess} = useGetBlogQuery(Number(id||1));
    const blog = data as any;

    useEffect(()=>{
        if(topHeader.current && pageBody.current){
            var header = topHeader.current as HTMLElement;
            var body = pageBody.current as HTMLElement;
            body.style.top = header.offsetHeight.toString() + "px";
        }
    })

    return (
    <div>
        <div ref={topHeader} className="position-fixed w-100 z-1"><NavBar /></div>
        <div ref={pageBody} className="row m-0 position-relative">
            <div className="col-9 myp-0">
                <div className="position-relative myfs">
                    <div className="w-90 position-relative start-50 translate-middle-x mt-3">
                        <Blog />
                    </div>
                </div>
            </div>
            <div className="col-3 myp-0">
                <div className="position-fixed overflow-y-scroll"
                style={{height:`calc(100vh - ${topHeader.current?.offsetHeight.toString()}px)`, width:"inherit"}}>
                    {isSuccess && <SideMenu category={data.category} />}
                </div>
            </div>
        </div>
        
    </div>
    )
}