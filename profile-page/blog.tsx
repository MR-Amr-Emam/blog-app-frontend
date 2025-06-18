import { useNavigate } from "react-router"

interface Props{
    mini?:boolean,
    id:number,
    title:string,
    views:number,
    likes:number,
    description:string,
    image:string

}


export function Blog(props:Props){
    const navigate = useNavigate()
    return (
        <div onClick={()=>navigate("/blog")} className={`bg-white w-90 position-relative start-50 translate-middle-x myp-2 myfs ${props.mini?"border":"shadow"} my-3 pointer`}>
            <div>
                <img className="w-100" src="https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg" />
            </div>
            <div>
                <div className={`myfs-4 fw-semibold text-first`}>{props.title}</div>
                <div className={`myfs-mini text-dark-emphasis`}>{props.views} views {props.likes} likes</div>
                {props.mini?"":<p className="text-dark">{props.description}</p>}
            </div>
        </div>
    )
}