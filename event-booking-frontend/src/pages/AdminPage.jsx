import { useEffect, useState } from "react";
import AdminTableRow from "../components/AdminTableRow";
import { default as CrudButton, default as EventModal } from "../components/EventModal";
import Navbar from "../components/Navbar";

export default function AdminPage(){

    const [showEventModal, setShowEventModal] = useState(false);
    const [events, setEvents] = useState([]);



    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/events');
            const data = await response.json();
            setEvents(data.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

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
                <div class="flex gap-2 mt-3 mb-10">
                    <button onClick={() => setShowEventModal(true)} class="rounded-sm bg-blue-500 text-white font-medium p-1.5 flex items-center justify-center border-blue border-1 hover:text-blue hover:border-blue hover:bg-white cursor-pointer">
                        Create New Event
                    </button>
                    <button onClick={() => setShowEventModal(true)} class="rounded-sm bg-green-500 text-white font-medium p-1.5 flex items-center justify-center border-green-500 border-1 hover:text-green-500 hover:border-green hover:bg-white cursor-pointer">
                        Create New Category
                    </button>
                </div>
                <EventModal onEventUpdated={fetchEvents} isVisible={showEventModal} onClose={() => setShowEventModal(false)}/>


                <table class="table-auto border-separate border-spacing-y-4 w-full">
                    <thead>
                        <tr>
                            <th class="w-10 text-start">#</th>
                            <th class="w-20 text-start">Image</th>
                            <th class="w-50 text-start">Name</th>
                            <th class="w-50 text-start">Venue</th>
                            <th class="w-30 text-start">Price</th>
                            <th class="w-50 text-start">Date</th>
                            <th class="w-50 text-start">Category</th>
                            <th class="w-50 text-start">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                    {events.map((event, index) => (
                        <AdminTableRow class="mb-30" key={event.id} eventId={event.id} index={index} />
                    ))}
                    </tbody>
                </table>
            </section>
        </>

    )
}