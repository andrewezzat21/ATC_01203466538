import { useState } from "react";
import { default as CrudButton, default as EventModal } from "../components/EventModal";
import Navbar from "../components/Navbar";

export default function AdminPage(){

    const [showEventModal, setShowEventModal] = useState(false);

    return(
        <>
            <Navbar/>
            <section class="px-15 py-10">
                <div class="flex items-center">
                    <h1 class="font-pop text-5xl font-medium">Events Dashboard</h1>
                </div>
                <div class = "font-mont">See and edit all the events on the website!</div>
                <div class = "w-full h-5 bg-navy mt-3 text-white flex items-center" >

                </div>
                <button onClick={() => setShowEventModal(true)} class=" mt-5 rounded-sm bg-blue-500 text-white font-medium p-1.5 flex items-center justify-center hover:text-blue hover:border-1 hover:border-blue hover:bg-white cursor-pointer" >Create New Event!</button>
                <EventModal isVisible={showEventModal} onClose={() => setShowEventModal(false)}/>
            </section>
        </>

    )
}