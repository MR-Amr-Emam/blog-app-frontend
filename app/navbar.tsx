import {Link} from "react-router";

export function NavBar(){
    return (
    <div className="bg-first text-light myfs myp-3 position-relative">
        <div className="row w-100">
            <div className="col">
                <div className="d-flex">
                    <div className="mx-2 pointer glory">Blog</div>
                    <div className="mx-2 pointer glory"><Link to="/home">home</Link></div>
                    <div className="mx-2 pointer glory"><Link to="/profile">profile</Link></div>
                </div>
            </div>
            <div className="col">
                <div className="d-flex flex-row-reverse w-100">
                    <div className="pointer glory">login</div>
                </div>
            </div>
        </div>
    </div>
    )
}