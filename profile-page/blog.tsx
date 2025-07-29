import { TrashFill } from "react-bootstrap-icons";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { setRefetch } from "@/state-manage/profile-page-slice";
import { usePutBlogMutation } from "@/state-manage/blogs-query";
import { calc_date } from "@/app/functions";
import { useEffect } from "react";

interface Props{
    mini?:boolean,
    userId:number,
    id:number,
    title:string,
    views:number,
    likes:number,
    description:string,
    image:string,
    date:string,

}


export function Blog(props:Props){
    const userId = useSelector((state:any)=>state.user.id);
    const [mutate, result] = usePutBlogMutation();
    const dispatch = useDispatch();

    useEffect(()=>{
        result.isSuccess && dispatch(setRefetch(true));
    }, [result.isSuccess])

    return (
        <div className={`bg-white w-100 position-relative start-50 translate-middle-x
        myfs ${props.mini?"border":"shadow"} my-3 overflow-hidden`} style={props.mini?{}:{ aspectRatio:1.1 }}>
            {result.isLoading && <div className="blured" />}
            <Link to={`/blog/${props.id}/`}><div>
                <img className="w-100" src={props.image} style={{ aspectRatio:2 }} />
            </div></Link>
            <div className="myp-2">
                <div className="d-flex justify-content-between">
                    <div className={`${props.mini?"myfs-mini":"myfs"} fw-semibold text-first`}>{props.title}</div>
                    {props.userId==userId && <div className="myfs-mini text-end"><TrashFill className="text-danger pointer" onClick={()=>{mutate({id:props.id, method:"delete"})}} /></div>}
                </div>
                <div className={`myfs-mini text-dark-emphasis`}>{calc_date(props.date)}</div>
                <div className={`myfs-mini text-dark-emphasis`}>{props.views} views {props.likes} likes</div>
                {props.mini?"":<p className="text-dark">{props.description}</p>}
            </div>
            {props.mini?"":<div className="position-absolute bottom-0 w-100" style={{
                height:"20%", background:"linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7))"}} />}
        </div>
    )
}