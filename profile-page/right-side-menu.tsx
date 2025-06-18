import { Blog } from "./blog";
import { Dispatch, SetStateAction } from "react";
import style from "./profile-page.module.css";

interface Props{
    setIsProfPic: Dispatch<SetStateAction<boolean>>,
    miniblogs?: any,
    setSideMenuSelect: Dispatch<SetStateAction<string>>;
}

export function RightSideMenu(props:Props){
    const setIsProfPic = props.setIsProfPic;
    const miniblogs = props.miniblogs;
    const setSideMenuSelect = props.setSideMenuSelect;
    return (
        <div>
            <div className="w-100">
                <img src="https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg" className="w-100" />
            </div>
            <div className="myp-3">
                <div className={`${style["profile-image"]} d-flex`}>
                    <div className="mx">
                        <img onClick={()=>{setIsProfPic(true);}} className="circle-1 pointer" src="https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg" />
                    </div>
                    <div className="position-relative w-100 mx-3">
                        <p className="position-absolute top-50 translate-middle-y">Amr Emam</p>
                    </div>
                </div>
                <div className="myfs-mini text-dark-emphasis mt-2 pointer" onClick={()=>{
                    setSideMenuSelect("friends")
                }}>8 blogs 127 friends</div>
                <div className="mt-3">
                    <p>that is bio, that is bio, that is bio, that is bio, that is bio, that is bio, </p>
                </div>
                <div className="text-dark-emphasis myfs-mini">joined at sep 2025</div>
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
    )
}


export function FriendsMenu(props:Props){
    const setIsProfPic = props.setIsProfPic;
    const setSideMenuSelect = props.setSideMenuSelect;
    var array = [];
    for(let i=0; i<100; i++){
        array.push(i);
    }
    return (
        <div className="myp-33">
            <div className="d-flex align-items-center">
                <div className="myfs fw-bold pointer me-3" onClick={()=>{
                    setSideMenuSelect("menu")
                }}>&larr;</div>
                <div>
                    <div className="text-center fw-semibold myfs">Friends</div>
                    <div className="myfs-mini text-dark-emphasis text-center">127 friends</div>
                </div>
            </div>
            
            <p></p>
            {array.map((ele, index)=>{
                return (
                    <div key={index} className={`${style["profile-image"]} d-flex mb-3 pointer px-2`}>
                        <div className="mx">
                            <img onClick={()=>{setIsProfPic(true);}} className="circle-mini pointer" src="https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg" />
                        </div>
                        <div className="position-relative w-100 mx-3">
                            <p className="position-absolute top-50 translate-middle-y myfs-mini">Amr Emam</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}