import { useState } from "react";
import style from "./home-page.module.css";
export function MiniNavbar(){
    const [focused, setFocused] = useState("movies");
    const menus = ["movies", "education", "adventures"]
    return (
        <div className="d-flex justify-content-center shadow-bottom bg-white">
            {menus.map((menu:string, index:number)=>{return(
                <div key={index} className={`${style["mini-nav-ele"]} ${focused==menu?style.focused:""} myp-3
                myfs pointer`} onClick={()=>{setFocused(menu)}}>{menu}</div>
            )})}
        </div>
    )
}