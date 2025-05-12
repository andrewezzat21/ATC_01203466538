import { Link } from "react-router-dom";

export default function NavLink({to, name}){
    return(
        <Link className=" hover:text-white hover:opacity-75 ml-6 text-md font-mont font-light" to={to}>{name}</Link>
    );
}