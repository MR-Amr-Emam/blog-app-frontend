import { useState } from "react";
import { Blog as BlogType } from "@/state-manage/blogs-slice";
import { Blog } from "@/profile-page/blog";

import { useGetBlogsQuery } from "@/state-manage/blogs-query";

export function SideMenu({category}:{category:number}){
    const [isProfPic, setIsProfPic] = useState(false);
    const {data, isSuccess} = useGetBlogsQuery({id:category || 0, type:"related"});
    return(
        <div className="bg-light text-dark myp-3 myfs h-100">
            <div className="fw-semibold text-center mx-3">related blogs</div>
                {isSuccess && data.map((blog:BlogType, index:number)=>{
                    return(
                    <Blog key={blog.id} mini={true} userId={blog.userId} id={blog.id} title={blog.title} views={blog.views}
                    likes={blog.likes} description={blog.description} image={blog.image} date={blog.date} />
                    )
            })}
        </div>
    )
}