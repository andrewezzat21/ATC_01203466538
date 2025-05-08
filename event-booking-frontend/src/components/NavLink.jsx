import { Link } from "react-router-dom";

export default function NavLink({to, name}){
    return(
        <Link class="hover:text-blue ml-6 text-lg font-mont" to={to}>{name}</Link>
    );
}