"use client"

import { BACKEND_DOMAIN } from "../functions";

export function LoginBtn(){
    async function login(){
        var usernameInput = document.getElementById("username") as HTMLInputElement;
        var passwordInput = document.getElementById("password") as HTMLInputElement;
        if(usernameInput && passwordInput){
            var formData = new FormData();
            formData.append("username", usernameInput.value)
            formData.append("password", passwordInput.value)
            var response = await fetch(BACKEND_DOMAIN + "auth/token/", {
                body:formData,
                method:"post",
                credentials:"include",
            });
            if(response.ok){
                window.location.href = window.location.origin;
            }
        }

    }

    return(
        <div className="mb-3 mt-2">
            <button className="btn btn-first myfs w-100 rounded-0" onClick={login}>log in</button>
        </div>
    )
}