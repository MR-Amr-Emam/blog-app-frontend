"use client"
import { useEffect, useState } from "react";
import { BACKEND_DOMAIN } from "../functions";

export function LoginBtn(){
    const [isClient, setIsClient] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{setIsClient(true)}, [])

    
    async function login(){
        setLoading(true)
        var usernameInput = document.getElementById("username") as HTMLInputElement;
        var passwordInput = document.getElementById("password") as HTMLInputElement;
        if(usernameInput && passwordInput){
            var formData = new FormData();
            formData.append("username", usernameInput.value)
            formData.append("password", passwordInput.value)
            var response = await fetch(BACKEND_DOMAIN + "/auth/token/", {
                body:formData,
                method:"post",
                credentials:"include",
            });
            if(response.ok){
                window.location.href = window.location.origin;
            }else{
                setLoading(false);
                setErrorMsg("invalid username or password");
            }
        }
    }
    if(!isClient){return null;}
    return(
        <div className="mb-3 mt-2">
            <button className="btn btn-first myfs w-100 rounded-0" onClick={login}>log in</button>
            <div className="text-danger text-center myfs-mini mt-2">{errorMsg}</div>
            <div className="text-gray myfs-mini">do not have account?
                <a className="text-primary mx-1 pointer" href={document.location.origin+"/signup"}>create account</a>
            </div>
            {loading&&<div className="d-flex justify-content-center text-first w-100">
                <div className="spinner-border" />
            </div>}
        </div>
    )
}