import { Blog } from "./blog"

export function AllBlogs(probs:any){
    return (
        <div>
            <div className="row justify-content-center w-100">
                <div className="col-5">
                    {probs.miniblogs.map((blog:any, index:number)=>{
                        return(
                        !(index%2)?
                        <Blog key={blog.id} mini={false} id={blog.id} title={blog.title} views={blog.views}
                        likes={blog.likes} description={blog.description} image={blog.image} />
                        :"")
                    })}
                </div>
                <div className="col-5">
                {probs.miniblogs.map((blog:any, index:number)=>{
                        return(
                        (index%2)?
                        <Blog key={blog.id} mini={false} id={blog.id} title={blog.title} views={blog.views}
                        likes={blog.likes} description={blog.description} image={blog.image} />
                        :"")
                    })}
                </div>
            </div>
        </div>
    )
}