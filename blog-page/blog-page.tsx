import { NavBar } from "@/app/navbar";
import style from "./blog-page.module.css";
import { BlogSection } from "./blog-section";
import { MainSection } from "./main-section";
import { AddComment } from "./add-comment";
import { Comment } from "./comment";
import { SideMenu } from "./side-menu";
import { useSelector } from "react-redux";

export default function BlogPage(){
    const blog = useSelector((state:any)=>state.blogs[0]);
    const comments = useSelector((state:any)=>state.comments);
    return (
    <div>
        <NavBar />
        <div className="row m-0">
            <div className="col-9 myp-0">
            <div className="position-relative myfs">
            <div className="w-75 position-relative start-50 translate-middle-x mt-3">

                <MainSection username={blog.username} views={blog.views} likes={blog.likes}
                date={blog.date} title={blog.title} description={blog.description} image={blog.image}   />

            </div>
            <div className="shadow myp-3 rounded mt-3 w-75 position-relative start-50 translate-middle-x myp-2">
                <div className={`${style["main-image"]} w-100 position-relative start-50 translate-middle-x mt-3`}></div>

                {blog.sections.map((section:any, index:number)=><BlogSection key={index} image={section.image} paragraph={section.paragraph} />)}
            </div>
            <div className="mt-3 w-75 position-relative start-50 translate-middle-x">
                <AddComment />
                {comments.map((comment:any, index:number)=><Comment key={index} username={comment.username}
                image={comment.image} date={comment.date} likes={comment.likes} comment={comment.comment} comments={comment.comments} />)}
            </div>
        </div>
            </div>
            <div className="col-3 myp-0">
                <SideMenu />
            </div>
        </div>
        
    </div>
    )
}