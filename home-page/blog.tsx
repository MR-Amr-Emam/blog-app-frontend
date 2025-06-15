import { useState } from "react";

import { ExtendBlog } from "./extend-blog";

interface Props{
    id: number;
    username:string;
    date: string;
    image: string;
    title: string;
    description: string;

}

export function Blog(props:Props){

    const [extend, setExtend] = useState(false);

    return (
        <div className="mt-3 shadow w-75 position-relative start-50 translate-middle-x">
            <div className="myp-2">
                <div className="d-flex align-items-center">
                    <div><img src={props.image} className="circle-1 pointer" /></div>
                    <div className="myfs mx-2 pointer">
                        <div className="fw-semibold">{props.username}</div>
                        <div className="myfs-mini text-dark-emphasis">{calc_date(props.date)}</div>
                    </div>
                </div>
            </div>
            <div><img className="w-100" src={props.image}></img></div>
            <div className="myp-2">
                <div className="myfs fw-semibold">{props.title}</div>
                <div className="myfs">{props.description}</div>
            </div>
            <div className="myp-2">
                <div className={`${extend?"d-none":"d-block"}`}><span className={`pointer myfs text-dark-emphasis`} onClick={()=>{setExtend(true)}}>see more</span></div>
                <ExtendBlog state={extend} setExtend={setExtend} />
            </div>
        </div>
    )
}

function calc_date(date:string):string{
    var diff = Date.now() - Date.parse(date);
    diff = diff/1000/60/60;
    var state = "min";
    if(diff>60){
        diff/=60;
        state="hr"
    }
    if(diff>24){
        diff /=24;
        state = "day";
    }
    if(diff>30){
        diff/=30;
        state = "month";
    }
    if(diff>12){
        diff/=12
        state = "year";
    }
    diff = Math.round(diff);
    return diff + " " + state + " ago";
}