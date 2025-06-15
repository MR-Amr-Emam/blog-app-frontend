import { Dispatch } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

export function ExtendBlog({state, setExtend}:{state:boolean, setExtend:any}){
    const sections = useSelector((state:any)=>state.blogs[0].sections)
    return(
        <div className={`${state?"d-block":"d-none"}`}>
            <div className="d-flex flex-row-reverse">
                <div className="myfs-3 pointer" onClick={()=>{setExtend(false)}}>x</div>
            </div>
            {sections.map((section:any, index:number)=>{
                return(
                    <div key={index} className="row mt-4">
                        <div className="col-7 myfs">
                            {section.paragraph}
                        </div>
                        <div className="col-5">
                            <img src={section.image} className="w-100" />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}