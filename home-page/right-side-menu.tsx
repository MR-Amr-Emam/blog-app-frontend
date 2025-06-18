import { Link } from "react-router";
import style from "./home-page.module.css";

export function RightSideMenu(){
    const friends = ["amr", "medo", "ali", "areej"];
    const groups = ["bros", "cychopaths", "athletes"];
    return(
        <div className={`${style["right-menu"]} bg-light text-dark myp-3 myfs h-100 w-90 position-relative`}>
            <div className="fw-semibold text-center mx-3">friends</div>
            {friends.map((friend:string, index:number)=>{
                return(
                    <div key={index} className="d-flex align-items-center mt-3">
                        <div><img src="https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"
                        className="circle-mini" /></div>
                        <div className="myfs mx-2">{friend}</div>
                    </div>
                )
            })}

            <div className="fw-semibold text-center mx-3 mt-4">groups</div>
            {groups.map((friend:string, index:number)=>{
                return(
                    <Link key={index} to="/group"><div className="d-flex align-items-center mt-3">
                        <div><img src="https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"
                        className="circle-mini" /></div>
                        <div className="myfs mx-2">{friend}</div>
                    </div></Link>
                )
            })}
        </div>
    )
}