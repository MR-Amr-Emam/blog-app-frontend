"use client"

export function LoginBtn(){
    async function login(){
        var usernameInput = document.getElementById("username") as HTMLInputElement;
        var passwordInput = document.getElementById("password") as HTMLInputElement;
        if(usernameInput && passwordInput){
            var origin = "http://" + window.location.hostname + ":8000/";
            var formData = new FormData();
            formData.append("username", usernameInput.value)
            formData.append("password", passwordInput.value)
            var response = await fetch(origin + "auth/token/", {
                body:formData,
                method:"post",
                credentials:"include",
            });
            if(response.ok){
                window.location.href = "http://" + window.location.hostname + ":3000/";
            }
        }

    }

    return(
        <div className="mb-3 mt-2">
            <button className="btn btn-first myfs w-100 rounded-0" onClick={login}>log in</button>
        </div>
    )
}