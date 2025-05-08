import CrudButton from "../components/CrudButton";
import Navbar from "../components/Navbar";

export default function AdminPage(){

    const addButton = () => {
        alert("add");
    };

    return(
        <>
            <Navbar/>
            <section class="px-15 py-10">
                <div class="flex items-center">
                    <h1 class="font-pop text-5xl">All Events</h1>
                    <CrudButton label={"+"} primaryColor={"blue"} secondaryColor={"white"} onClick={addButton}/>
                </div>
                <div class = "font-mont">Admin Page</div>
            </section>
        </>

    )
}