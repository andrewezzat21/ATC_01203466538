import { useEffect, useState } from "react";
// import AdminTableRow from "../components/AdminTableRow";
import AdminCard from "../components/AdminCard";
import CategoryModal from "../components/CategoryModal";
import EditModal from "../components/EditModal";
import EventModal from "../components/EventModal";
import Navbar from "../components/Navbar";

export default function AdminPage(){

    const [showEventModal, setShowEventModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [events, setEvents] = useState([]);
    const [editEventDetails, setEditEventDetails] = useState({});
    const [reloadTrigger, setReloadTrigger] = useState(0);

    const fetchEvents = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8080/api/v1/events',{
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setEvents(data.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };


    useEffect(() => {
        fetchEvents();
    }, [reloadTrigger]);


    const onCategoryUpdate = () => {
        setReloadTrigger(prev => prev + 1);
    }

    const onEditClick = (eventDetails) => {
        setShowEditModal(true);
        setEditEventDetails(eventDetails);
    }

    

    return(
        <>
        <section className="font-pop">
            <EventModal reloadTrigger={reloadTrigger} onEventUpdated={fetchEvents} isVisible={showEventModal} onClose={() => setShowEventModal(false)}/>
            <CategoryModal onCategoryUpdate={onCategoryUpdate} isVisible={showCategoryModal} onClose={() => setShowCategoryModal(false)}/>
            <EditModal eventDetails={editEventDetails} reloadTrigger={reloadTrigger} onEventUpdated={fetchEvents} isVisible={showEditModal} onClose={() => setShowEditModal(false)}/>
            <Navbar />
                <div className=" flex justify-between items-center h-40 w-full bg-blue-500 px-15 py-10">
                    <div className="border-1 border-blue-500 rounded-2xl  py-5">
                        <h1 className="animate-appear duration-1000 opacity-100 text-white text-4xl font-bold">Events Dashboard</h1>
                        <h2 className="animate-appear2 text-white text-lg font-light">See and manage all website events!</h2>
                    </div>
                        <div className="border-1 border-white rounded-2xl px-10 py-5 mr-20 animate-appear duration-1000 opacity-100 text-white text-2xl font-bold">Total Events: {events.length}</div>
                </div>
                <div className="animate-appear3 flex gap-2 mt-5 mb-5 px-15 font-mont font-light ">
                    <button onClick={() => setShowEventModal(true)} className="rounded-sm bg-blue-500 text-white p-1.5 flex items-center justify-center border-blue border-1 hover:text-blue hover:border-blue hover:bg-white cursor-pointer">
                        Create New Event
                    </button>
                    <button onClick={() => setShowCategoryModal(true)} className="rounded-sm bg-green-500 text-white p-1.5 flex items-center justify-center border-green-500 border-1 hover:text-green-500 hover:border-green hover:bg-white cursor-pointer">
                        Manage Categories
                    </button>
                </div>
                <div className="z-0 justify-between grid grid-cols-3 gap-y-0 place-items-center w-full px-25">
                     {events.map((event, index) => (
                         <AdminCard onEditClick={onEditClick} onEventUpdated={fetchEvents} key={event.id} eventId={event.id} index={index} />
                     ))}
                </div>
            </section>
        </>
    )
}