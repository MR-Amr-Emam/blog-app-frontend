import { useState } from "react";
import style from "./home-page.module.css";

import { useGetCategorysQuery } from "@/state-manage/blogs-query";

export function MiniNavbar({category, setCategory}:any){
    const categorysObj = useGetCategorysQuery();
    return (
        <div className="d-flex justify-content-center shadow-bottom bg-white">

            <div key={0} className={`${style["mini-nav-ele"]} ${category.category=="all"?style.focused:""} myp-3
            myfs pointer`} onClick={()=>{setCategory({category:"all", id:0})}}>{"all"}</div>

            {categorysObj.isSuccess && (categorysObj.data).map((obj:any, index:number)=>{return(
                <div key={index} className={`${style["mini-nav-ele"]} ${category.category==obj.category?style.focused:""} myp-3
                myfs pointer`} onClick={()=>{setCategory(obj)}}>{obj.category}</div>
            )})}
        </div>
    )
}