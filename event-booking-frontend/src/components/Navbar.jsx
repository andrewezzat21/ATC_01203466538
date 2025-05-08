import NavLink from "./NavLink";

export default function Navbar(){
    return(
        <nav >
            <div class="flex justify-between py-2 px-10">
                <h1 class="text-3xl font-black text-blue">EVNT.</h1>
                <ul class="flex items-center">
                    <NavLink to={"/login"} name={"Login"}/>
                    <NavLink to={"/register"} name={"Register"}/>
                </ul>
             </div>
        </nav>
       
    )
}