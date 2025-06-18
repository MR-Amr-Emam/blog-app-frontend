import { useState, Dispatch, SetStateAction } from "react";
import style from "./profile-page.module.css";

interface Props{
    menus: string[],
    focused: string,
    setFocused: Dispatch<SetStateAction<string>>
}

export function MiniNavbar(props:Props){
    const menus = props.menus;
    const focused = props.focused;
    const setFocused = props.setFocused;
    
    return (
        <div className="d-flex justify-content-center shadow-bottom bg-white">
            {menus.map((menu:string, index:number)=>{return(
                <div key={index} className={`${style["mini-nav-ele"]} ${focused==menu?style.focused:""} myp-3
                myfs pointer`} onClick={()=>{setFocused(menu)}}>{menu}</div>
            )})}
        </div>
    )
}