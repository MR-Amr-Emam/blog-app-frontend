import { useEffect, useRef, useState } from "react";
import style from "./blog-page.module.css";

export function AddComment(){
    const [isActive, setIsActive] = useState(false);
    const addComment = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        function endActive(e:Event){
            if(addComment.current?.contains(e.target as Node) && !isActive){
                setIsActive(true)
            }else if(!(addComment.current?.contains(e.target as Node))){
                setIsActive(false)
            }
        }
        document.addEventListener("click", endActive);
        return ()=>{document.removeEventListener("click", endActive)}
    })
    return (
        <div ref={addComment} className={style["add-comment"]}>
            <div className="d-flex">
                <div>
                    <img className="circle-1 mx-3" src="https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"></img>
                </div>
                <div className={`${style["comment-options"]} w-100 myp-1`}>
                    <div className={`${!isActive&&"d-none"} d-flex flex-row-reverse border-bottom`}>
                        <div className="myfs-mini pointer myp-1">comment</div>
                        <div className="myfs-mini pointer myp-1">edit</div>
                    </div>
                    <textarea className={`${isActive&&style.focus} text-dark w-100 myp-1`} placeholder="add comment" />
                </div>
            </div>
        </div>
    )
}