import { useSelector } from "react-redux";
import { Blog } from "./blog";
import { NavBar } from "@/app/navbar";
import { MiniNavbar } from "./mini-navbar";
import { RightSideMenu } from "./right-side-menu";
import { LeftSideMenu } from "./left-side-menu";
import { useEffect, useRef, useState } from "react";
import { AddBlog } from "./add-blog";
import { CreateGroup } from "./create-group";

import { Blog as BlogType } from "@/state-manage/blogs-slice";
import { useGetHomeBlogsQuery } from "@/state-manage/blogs-query";


export default function HomePage(){
    const [category, setCategory] = useState({category:"all", id:0});
    const homeBlogsObj = useGetHomeBlogsQuery(category.id);
    const topHeader = useRef(null);
    const pageBody = useRef(null);

    const [addBlog, setAddBlog] = useState(false);
    const [createGroup, setCreateGroup] = useState(false);

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
                <MiniNavbar category={category} setCategory={setCategory} />
            </div>
            {addBlog?<AddBlog setAddBlog={setAddBlog} />:""}
            {createGroup?<CreateGroup setCreateGroup={setCreateGroup} />:""}
            <div className="row position-relative m-0" ref={pageBody}>
                <div className="col-3 ps-0">
                    <div className="position-fixed h-full w-25"><LeftSideMenu /></div>
                </div>
                <div className="col-6">
                    <div className="w-100 position-relative start-50 translate-middle-x">
                        <div className="my-3 text-dark pointer rounded myfs myp-2 rounded shadow" onClick={()=>{setAddBlog(true)}}>what is in your mind ...</div>
                        {homeBlogsObj.isSuccess && homeBlogsObj.data.map((blog:BlogType, index:number)=>
                        <Blog key={index} blog={blog} refetch={homeBlogsObj.refetch} />)}
                    </div>
                </div>
                <div className="col-3 d-flex flex-row-reverse pe-0">
                    <div className="position-fixed h-full w-25"><RightSideMenu setCreateGroup={setCreateGroup} /></div>
                </div>
            </div>
        </div>
    )
}