import { useEffect, useState, useRef, Dispatch } from "react";

import { Link } from "react-router";
import { useGetBlogQuery, usePutBlogMutation } from "@/state-manage/blogs-query";

import { Blog as BlogType } from "@/state-manage/blogs-slice";
import { Users } from "@/blog-page/blog"
import { calc_date } from "@/app/functions";


export function Blog({blog, refetch}:{blog:BlogType, refetch:any}){
    const [extend, setExtend] = useState(false);
    const [mutate, result] = usePutBlogMutation();
    const [isLikes, setIsLikes] = useState(false);
    const [isViews, setIsViews] = useState(false);

    useEffect(()=>{
        result.isSuccess && refetch();
    }, [result.isSuccess])

    return (
        <div className="mt-3 shadow w-75 position-relative start-50 translate-middle-x">
            <div className="myp-2">
                <div className="d-flex align-items-center">
                    <div><img src={blog.profileImage} className="circle-1" /></div>
                    <div className="myfs mx-2">
                        <Link to={`/profile/${blog.userId}`}><div className="fw-semibold">{blog.username}</div></Link>
                        <div className="myfs-mini text-dark-emphasis">{calc_date(blog.date)}</div>
                    </div>
                </div>
            </div>
            <div><Link to={`/blog/${blog.id}`}><img className="w-100 pointer" src={blog.image} /></Link></div>
            <div className="myp-2">
                <div className="myfs fw-semibold text-first">{blog.title}</div>
                <div className="myfs">{blog.description}</div>
                <div>
                    <span className="position-relative z-1">
                        <span className="pointer" onClick={()=>{setIsViews(false); setIsLikes(true)}}>{blog.likes} </span> 
                        {blog.liked?<span className="text-primary pointer" onClick={()=>{mutate(blog.id)}}>liked</span>:
                        <span className="pointer" onClick={()=>{mutate(blog.id)}}>likes</span>}
                        {isLikes?<Users users={blog.likedPeople} setState={setIsLikes} />:""}
                    </span>
                    <span className="mx-2 position-relative z-1">
                        <span className="pointer" onClick={()=>{setIsViews(true); setIsLikes(false)}}>{blog.views}</span> views
                        {isViews?<Users users={blog.viewedPeople} setState={setIsViews} />:""}
                    </span>
                </div>
            </div>
            <div className="myp-2">
                <div className={`${extend?"d-none":"d-block"}`}><span className={`pointer myfs text-dark-emphasis`} onClick={()=>{setExtend(true)}}>see more</span></div>
                {extend?<ExtendBlog state={extend} setExtend={setExtend} id={blog.id} />:""}
            </div>
        </div>
    )
}

export function ExtendBlog({state, setExtend, id}:{state:boolean, setExtend:any, id:number}){
    const {data, isSuccess} = useGetBlogQuery(id);
    return(
        <div className={`${state?"d-block":"d-none"}`}>
            <div className="d-flex flex-row-reverse">
                <div className="myfs-3 pointer" onClick={()=>{setExtend(false)}}>x</div>
            </div>
            {isSuccess && data.sections.map((section:any, index:number)=>{
                return(
                    <div key={index} className="mt-4">
                        <div className="">
                            <img src={section.image} className="w-100 ratio-2 rounded border" />
                        </div>
                        <div className="myfs text-dark myp-1">
                            {section.content}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
