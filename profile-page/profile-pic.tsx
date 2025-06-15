import { Dispatch, useRef } from "react"
import { SetStateAction } from "react"

export function ProfilePic({isProfPic, setIsProfPic}:{isProfPic:boolean, setIsProfPic:Dispatch<SetStateAction<boolean>>}){
    const Img = useRef<HTMLImageElement>(null);
    return (
        <div className={`blured ${!isProfPic&&"d-none"}`} onClick={(e)=>{
            if(!(Img.current?.contains(e.target as Node))){
                setIsProfPic(false);
            }
            }}>
            <div className="position-relative top-50 start-50 translate-middle w-50">
                <img ref={Img} className="w-100" src="https://t3.ftcdn.net/jpg/02/23/12/64/360_F_223126414_7kZvuFnqEbT3Qo27hnO2NuTmK2OdzDqx.jpg"></img>
            </div>
        </div>
    )
}