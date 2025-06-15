interface Props{
    username:string,
    views:number,
    likes:number,
    date:string,
    title:string,
    description:string,
    image:string,
}

export function MainSection(props:Props){
    return (
        <div>
            <div className="myfs-2 text-first fw-semibold">
                {props.title}
            </div>
            <div className=""> {props.description} </div>
            <div className="text-dark-emphasis myfs-mini mt-1">{props.likes} likes {props.views} views</div>

            <div className="d-flex align-items-center mt-3">
                <div><img src={props.image} className="circle-1 pointer" /></div>
                <div className="mx-2"><div className="fw-semibold">{props.username}</div><div className="myfs-mini text-dark-emphasis">{props.date}</div></div>
            </div>

        </div>
    )
}