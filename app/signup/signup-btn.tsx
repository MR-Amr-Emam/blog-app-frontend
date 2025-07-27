"use client"
import { useState } from "react";
import { BACKEND_DOMAIN } from "../functions";

export function SignUpBtn(){
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    async function login(){
        setLoading(true);
        var usernameInput = document.getElementById("username") as HTMLInputElement;
        var passwordInput = document.getElementById("password") as HTMLInputElement;
        var passwordCInput = document.getElementById("confirm-password") as HTMLInputElement;
        if(passwordInput.value != passwordCInput.value){setErrorMsg("passwords do not match"); setLoading(false); return;}
        if(usernameInput && passwordInput){
            var formData = new FormData();
            formData.append("username", usernameInput.value)
            formData.append("password", passwordInput.value)
            var response = await fetch(BACKEND_DOMAIN + "/auth/create/", {
                body:formData,
                method:"post",
                credentials:"include",
            });
            if(response.ok){
                window.location.href = window.location.origin+"/login";
            }else{
                setLoading(false);
                setErrorMsg("fill fields properly")
            }
        }

    }

    return(
        <div className="mb-3 mt-2">
            <button className="btn btn-first myfs w-100 rounded-0" onClick={login}>sign up</button>
            <div className="text-danger text-center myfs-mini mt-2">{errorMsg}</div>
            {loading&&<div className="d-flex justify-content-center text-first w-100">
                <div className="spinner-border" />
            </div>}
        </div>
    )
}