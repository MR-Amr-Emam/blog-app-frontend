import { Link } from "react-router"

import { calc_date } from "@/app/functions"

interface Props{
    mini?:boolean,
    id:number,
    title:string,
    views:number,
    likes:number,
    description:string,
    image:string,
    date:string,

}


export function Blog(props:Props){
    return (
        <Link to={`/blog/${props.id}/`}><div className={`bg-white w-100 position-relative start-50 translate-middle-x
        myfs ${props.mini?"border":"shadow"} my-3 pointer overflow-hidden`} style={props.mini?{}:{ aspectRatio:1.1 }}>
            <div>
                <img className="w-100" src={props.image} style={{ aspectRatio:2 }} />
            </div>
            <div className="myp-2">
                <div className={`${props.mini?"myfs-mini":"myfs"} fw-semibold text-first`}>{props.title}</div>
                <div className={`myfs-mini text-dark-emphasis`}>{calc_date(props.date)}</div>
                <div className={`myfs-mini text-dark-emphasis`}>{props.views} views {props.likes} likes</div>
                {props.mini?"":<p className="text-dark">{props.description}</p>}
            </div>
            {props.mini?"":<div className="position-absolute bottom-0 w-100" style={{
                height:"20%", background:"linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7))"}} />}
        </div></Link>
    )
}