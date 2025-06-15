import { useSelector } from "react-redux";
import { useState } from "react";
import { NavBar } from "@/app/navbar";
import { Blog } from "./blog";
import { ProfilePic } from "./profile-pic";
import style from "./profile.module.css"

export default function ProfilePage(){
    const [isProfPic, setIsProfPic] = useState(false);
    const miniblogs = useSelector((state:any)=>state.users[0].miniblogs);
    return (
        <div>
            <NavBar />
            <ProfilePic isProfPic={isProfPic} setIsProfPic={setIsProfPic} />
            <div className="container-fluid myp-0">
                <div className="row w-100 m-0">
                    <div className="col-9">
                        <div>
                            <div className="row justify-content-center w-100">
                                <div className="col-5">
                                    {miniblogs.map((blog:any, index:number)=>{
                                        return(
                                        !(index%2)?
                                        <Blog key={blog.id} mini={false} id={blog.id} title={blog.title} views={blog.views}
                                        likes={blog.likes} description={blog.description} image={blog.image} />
                                        :"")
                                    })}
                                </div>
                                <div className="col-5">
                                {miniblogs.map((blog:any, index:number)=>{
                                        return(
                                        (index%2)?
                                        <Blog key={blog.id} mini={false} id={blog.id} title={blog.title} views={blog.views}
                                        likes={blog.likes} description={blog.description} image={blog.image} />
                                        :"")
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 myp-0">
                        <div className="bg-dark text-light myp-3 myfs h-100">
                            <div className={`${style["profile-image"]} d-flex`}>
                                <div className="mx">
                                    <img onClick={()=>{setIsProfPic(true);}} className="circle-2 pointer" src="https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg" />
                                </div>
                                <div className="position-relative w-100 mx-3">
                                    <p className="position-absolute top-50 translate-middle-y">Amr Emam</p>
                                </div>
                            </div>
                            <div className="myfs-mini text-white-50 mt-2 pointer">8 blogs 127 friends</div>
                            <div className="mt-3">
                                <p>that is bio, that is bio, that is bio, that is bio, that is bio, that is bio, </p>
                            </div>
                            <div className="text-white-50 myfs-mini">joined at sep 2025</div>
                            <div className="d-flex myfs-mini mt-2"><div>instgram</div><div className="mx-3">linkedin</div></div>
                            <div className="mt-3">
                                <div className="fw-semibold text-center myfs-4 mx-3 border-top">top blogs</div>
                                    {miniblogs.map((blog:any, index:number)=>{
                                        return(
                                        index%3?
                                        <Blog key={blog.id} mini={true} id={blog.id} title={blog.title} views={blog.views}
                                        likes={blog.likes} description={blog.description} image={blog.image} />
                                        :"")
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}