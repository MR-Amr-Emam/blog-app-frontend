import { useState } from "react";
import { useSelector } from "react-redux";
import { Blog } from "./blog";

export function SideMenu(){
    const [isProfPic, setIsProfPic] = useState(false);
    const miniblogs = useSelector((state:any)=>state.users[0].miniblogs);
    return(
        <div className="bg-dark text-light myp-3 myfs h-100">
            <div className="fw-semibold text-center mx-3">related blogs</div>
                {miniblogs.map((blog:any, index:number)=>{
                    return(
                    index%3?
                    <Blog key={blog.id} mini={true} id={blog.id} title={blog.title} views={blog.views}
                    likes={blog.likes} description={blog.description} image={blog.image} />
                    :"")
            })}
        </div>
    )
}