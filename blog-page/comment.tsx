import style from "./blog-page.module.css";


interface Props{
    username:string,
    image:string,
    date:string,
    likes:number,
    comment:string,
    comments: Props[],
}


export function Comment(props:Props){
    return (
        <div className={` myp-2 d-flex m-3`}>
            <div className="mx-3">
                <img className="pointer circle-1" src={props.image} />
            </div>
            <div>
                <div><span className="fw-semibold pointer">{props.username}</span> <span className="text-dark-emphasis myfs-mini">2 months ago</span></div>
                <div>
                    <p>{props.comment}</p>
                </div>
                <div className="text-dark-emphasis myfs-mini">{props.likes} likes</div>
                <div className="border-start">
                {props.comments.map((comment:Props, index:number)=>
                <div key={index} className="myp-1 d-flex align-items-center mt-2 myfs-mini">
                    <div className="mx-1"><img className="circle-mini" src={comment.image} /></div>
                    <div className="mx-1 fw-semibold">{comment.username}</div>
                    <div className="mx-1">{comment.comment}</div>
                </div>)}
                </div>
            </div>
        </div>
    )
}