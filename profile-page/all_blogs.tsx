import { useGetBlogsQuery } from "@/state-manage/blogs-query";

import { Blog as BlogType} from "@/state-manage/blogs-slice";
import { useParams } from "react-router";

import { Blog } from "./blog"

export function AllBlogs(probs:any){
    const {id} = useParams();
    const {data, isSuccess} = useGetBlogsQuery({id:Number(id||0)});


    return (
        <div>
            <div className="row justify-content-center w-100">
                <div className="col-5">
                    {isSuccess ? data.map((blog:BlogType, index:number)=>{
                        return(
                        !(index%2)?
                        <Blog key={blog.id}
                        mini={false}
                        id={blog.id}
                        title={blog.title}
                        description={blog.description}
                        image={blog.image}
                        views={blog.views}
                        likes={blog.likes}
                        date={blog.date} />
                        :"")
                    }):<LoadingBox />}
                </div>
                <div className="col-5">
                {isSuccess ? data.map((blog:any, index:number)=>{
                        return(
                        (index%2)?
                        <Blog key={blog.id} mini={false} id={blog.id} title={blog.title} views={blog.views}
                        likes={blog.likes} description={blog.description} image={blog.image} date={blog.date} />
                        :"")
                    }):<LoadingBox />}
                </div>
            </div>
        </div>
    )
}

function LoadingBox(){
    return <div className="mt-3 shadow w-75 position-relative start-50 translate-middle-x bg-light ratio-1 d-flex justify-content-center align-items-center"><div className="spinner-border text-first" /></div>
}