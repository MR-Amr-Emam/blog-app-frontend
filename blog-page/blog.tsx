import { useGetUsersByIdQuery } from "@/state-manage/users-query";
import { useGetBlogQuery, usePutBlogMutation,
    useGetCommentsQuery, usePutCommentMutation,
    useLikeCommentMutation, } from "@/state-manage/blogs-query";
import { useParams, Link } from "react-router";
import { useState, useEffect, useRef, Dispatch, use } from "react";
import { useSelector } from "react-redux";

import style from "./blog-page.module.css";
import { Blog as BlogType } from "@/state-manage/blogs-slice";
import { calc_date } from "@/app/functions"

export function Blog(){
    const {id} = useParams();
    const {data, isSuccess, refetch} = useGetBlogQuery(Number(id||5));
    const [mutate, result] = usePutBlogMutation();
    const blog = data as BlogType;
    const [areComments, setAreComments] = useState(false);
    const [views, setViews] = useState(false);
    const [likes, setLikes] = useState(false);
    const observerRef = useRef<any>(null);
    useEffect(()=>{
        isSuccess && result.isSuccess && refetch();
    }, [isSuccess, result.isSuccess])

    useEffect(()=>{
        var observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if(entry.isIntersecting){
                    setAreComments(true);
                    observer.disconnect();
                }
            })
        }, {rootMargin:"25%"})
        observerRef.current && observer.observe(observerRef.current);
    })

    return (
        <>{isSuccess ? <div>
            <div className="d-flex align-items-center mt-3">
                <div><img src={blog.profileImage} className="circle-1 pointer" /></div>
                <div className="mx-2"><Link to={`/profile/${blog.userId}/`}><div className="fw-semibold pointer">{blog.username}</div></Link>
                <div className="myfs-mini text-dark-emphasis">{calc_date(blog.date)}</div></div>
            </div>
            <div><img src={blog.image} className="w-100 ratio-2 mt-3" /></div>
            <div>
                <div className="myfs-4 text-first fw-semibold mt-2">
                    {blog.title}
                </div>
                <div className="myfs"> {blog.description} </div>
                <div className="text-dark-emphasis myfs-mini mt-2">
                    <span className="position-relative">
                        <span onClick={()=>{setLikes(true); setViews(false)}} className="pointer">{blog.likes}</span>
                        {blog.liked?<span className="text-primary pointer" onClick={()=>{mutate(Number(id||5));}}> liked </span>
                        :<span onClick={()=>{mutate(Number(id||5));}} className="pointer"> likes </span>}
                        {likes?<Users setState={setLikes} users={blog.likedPeople} />:""}
                    </span>
                    <span className="position-relative">
                        <span onClick={()=>{setViews(true); setLikes(false)}} className="pointer">{blog.views} </span>
                        views{views?<Users setState={setViews} users={blog.viewedPeople} />:""}
                    </span></div>
            </div>
            {blog.sections.length ? <div className="shadow w-75 position-relative start-50 translate-middle-x myp-3 mt-3">
                {blog.sections.map((section, index)=>
                <BlogSection key={index} image={section.image} content={section.content} />)}
            </div>:""}

            <div ref={observerRef} className="mt-3 w-75 position-relative start-50 translate-middle-x">
                {areComments?<Comments />:""}
            </div>

        </div>:""}</>
    )
}

interface BlogSectionProps{
    image:string,
    content:string,
}

export function BlogSection(props:BlogSectionProps){
    return(
        <div style={{marginBottom:"calc(3 * var(--unit))"}}>
            <div className="w-100 border rounded"><img src={props.image} className="w-100 rounded" style={{aspectRatio:2}} /></div>
            <p className="myfs myp-3 text-gray">{props.content}</p>
        </div>
    )
}

interface UsersProps{
    users:number[],
    setState: Dispatch<boolean>,
}

export function Users(props:UsersProps){
    console.log(props.users)
    const eleRef = useRef<HTMLDivElement>(null);
    const {data, isSuccess, refetch} = useGetUsersByIdQuery(props.users);
    function close(e:Event){
        var target = e.target as HTMLElement;
        if(eleRef.current && !eleRef.current.contains(target)){
            props.setState(false);
        }
    }
    useEffect(()=>{
        document.addEventListener("click",close);
        return ()=>{document.removeEventListener("click",close)}
    })
    return (
        <div ref={eleRef} className="position-absolute top-100 start-50 translate-middle-x
        bg-white z-2 shadow myp-1 rounded" style={{width:"300%"}}>
            {isSuccess && data.map((user:any, index:number)=>
            <Link key={index} to={`/profile/${user.id}/`}><div
            onMouseEnter={(e:any)=>{(e.currentTarget as HTMLElement).classList.add("bg-gray");}}
            onMouseLeave={(e:any)=>{(e.currentTarget as HTMLElement).classList.remove("bg-gray");}}
            className="d-flex align-items-center myp-1 rounded">
                <div className="w-25"><img src={user.profile_image} className="circle-full ratio-1 w-100" /></div>
                <div className="mx-1 fw-semibold  myfs-mini">{user.username}</div>
            </div></Link>)}
        </div>
    )
}



function Comments(){
    const {id} = useParams();
    const {data, isSuccess, refetch} = useGetCommentsQuery(Number(id||5));
    return <div>
            <div><AddComment refetch={refetch} /></div>
            <div>
                {isSuccess && data.map((comment:any, index:number)=><Comment key={index} 
                data={comment} refetch={refetch} />)}
            </div>
        </div>
}



function AddComment({refetch}:{refetch:any}){
    const {id} = useParams()
    const [isActive, setIsActive] = useState(false);
    const addComment = useRef<HTMLDivElement>(null);
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const user = useSelector((state:any)=>state.user);
    const [mutate, result] = usePutCommentMutation()

    useEffect(()=>{
        result.isSuccess && setIsActive(false);
        result.isSuccess && refetch();
        if(result.isSuccess && commentRef.current)commentRef.current.value = "";
    }, [result.isSuccess])

    function submitBlog(){
        if(commentRef.current){
            var data = {content:commentRef.current.value};
            mutate({id:Number(id||5), data:data})
        }
    }

    useEffect(()=>{
        function endActive(e:Event){
            if(addComment.current?.contains(e.target as Node) && !isActive){
                setIsActive(true)
            }else if(!(addComment.current?.contains(e.target as Node))){
                setIsActive(false)
            }
        }
        document.addEventListener("click", endActive);
        return ()=>{document.removeEventListener("click", endActive)}
    })
    return (
        <div ref={addComment} className={style["add-comment"]}>
            <div className="d-flex">
                <div>
                    <img className="circle-1 mx-3" src={user.profileImage}></img>
                </div>
                <div className={`${style["comment-options"]} w-100 myp-1`}>
                    <div className={`${!isActive&&"d-none"} d-flex flex-row-reverse border-bottom`}>
                        <div className="myfs-mini pointer myp-1" onClick={()=>{submitBlog()}}>comment</div>
                        <div className="myfs-mini pointer myp-1" onClick={()=>{setIsActive(false)}}>cancel</div>
                    </div>
                    <textarea ref={commentRef} className={`${isActive&&style.focus} text-gray myfs-mini w-100 myp-1`} placeholder="add comment" />
                </div>
            </div>
        </div>
    )
}




interface CommentProps{
    data:{    
        id: number,
        date: string,
        user:{
            id:number,
            username:string,
            profile_image:string,
        }
        //date:string,
        //likes:number,
        content:string,
        likes_number:number,
        liked:boolean,
        comment_set: CommentProps[],
    },
    mini?:boolean,
    refetch: any,
}


export function Comment({data, mini, refetch}:CommentProps){
    const {id} = useParams();
    const [addComment, setAddComment] = useState(false);
    const commentContainer = useRef<HTMLDivElement>(null);
    const commentRef = useRef<HTMLInputElement>(null);
    const [mutate, result] = usePutCommentMutation();
    const [mutateLike, resutlLike] = useLikeCommentMutation()
    
    function submitComment(){
        if(commentRef.current){
            var data_submit = {
                content: commentRef.current.value,
                for_comment: true,
                parent_comment: data.id,
            }
            mutate({id:Number(id||5), data:data_submit})
        }
    }

    useEffect(()=>{
        (result.isSuccess || resutlLike.isSuccess) && refetch();
        result.isSuccess && setAddComment(false);
    }, [result.isSuccess, resutlLike.isSuccess])

    useEffect(()=>{
        addComment && commentRef.current && commentRef.current.focus();
    }, [addComment])

    useEffect(()=>{
        function endActive(e:Event){
            commentContainer.current && !commentContainer.current.contains(e.target as HTMLElement)
            && setAddComment(false);
        }
        document.addEventListener("click", endActive);
        return ()=>{document.removeEventListener("click", endActive)}
    }, [addComment])

    return (
        <div className={`d-flex myp-2 mt-3 align-items-start`}>
            <div className="mx-3">
                <Link to={`profile/${data.user.id}/`}><img className={`pointer circle-${mini?"mini":"1"}`} src={data.user.profile_image||undefined} /></Link>
            </div>
            <div className="w-100">
                <div className={mini?"myfs-mini":"myfs"}>
                    <span className="fw-semibold pointer">{data.user.username}</span>
                    <span className="text-dark-emphasis myfs-mini mx-1">{calc_date(data.date)}</span>
                </div>
                <div>
                    <p className="myfs-mini">{data.content}</p>
                </div>
                <div className="text-dark-emphasis myfs-mini d-flex">
                    <div>{data.likes_number} <span className={data.liked?"text-primary pointer":"pointer"}
                    onClick={()=>{mutateLike(data.id)}}>likes</span></div>
                    {!mini && <div className="mx-2 pointer" onClick={()=>{setAddComment(true);}}>reply</div>}
                </div>
                {!mini && addComment && <div className="myfs-mini text-dark" ref={commentContainer}>
                    <input ref={commentRef} className="myinput bg-white rounded-0 border-0 border-bottom text-dark w-100" />
                    <div className="mt-2"><span className="text-gray pointer" onClick={()=>{submitComment()}}>+ comment</span></div>
                </div>}
                <div className="border-start">
                    {data.comment_set && data.comment_set.map((comment:any, index:number)=>
                    <Comment key={index} data={comment} mini={true} refetch={refetch} />)}
                </div>
            </div>
        </div>
    )
}
