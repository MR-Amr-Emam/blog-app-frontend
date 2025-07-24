"use server"

import { LoginBtn } from "./login-btn"

export default async function LoginPage(){
    return (
        <div className="w-full h-full position-relative">
            <div className="w-30 bg-light myp-3 shadow border rounded position-absolute start-50 top-50 translate-middle"
            style={{minWidth:"400px"}}>
                <p className="text-center fw-semibold myfs-3 text-first">Login</p>
                <div className="myfs-mini">
                    <div className="mb-3">
                        <div>username</div>
                        <input type="text" id="username" className="myinput bg-gray text-gray" />
                    </div>
                    <div className="mb-3">
                        <div>password</div>
                        <input type="password" id="password" className="myinput bg-gray text-gray" />
                    </div>
                    <LoginBtn />
                </div>
            </div>
        </div>
    )
}