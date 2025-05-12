import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
export default function HomePage(){

    const [events, setEvents] = useState([]);
    const [userEvents, setUserEvents] = useState([]);


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

    const fetchTickets = async () => {

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        try {
            const url = 'http://localhost:8080/api/v1/tickets/user/' + userId;
            const response = await fetch(url, {  
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                alert(data.message)
            } else {
                setUserEvents(data.data.map(event => event.id));
            }
        } catch (error) {
            console.error('Error fetching user events:', error.message);
        }

    };

    useEffect(() => {
        fetchEvents();
        fetchTickets();
    }, []);

    const bookEvent = async (eventId) => {

        const userId = localStorage.getItem('userId');

        const jsonData = {};
        jsonData.eventId = eventId;
        jsonData.userId = userId;

        try {
            const token = localStorage.getItem('token');
            const url = 'http://localhost:8080/api/v1/tickets';
            const response = await fetch(url, {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(jsonData)
            });
            const data = await response.json();
            if (!response.ok) {
                alert(data.message)
            } else {
                alert("Event Booked Successfuly!")
                fetchEvents();
                fetchTickets();
            }

        } catch (error) {
            console.error('Error Booking The event:', error.message);
        }

    }

    const isBooked = (eventId) => {
        return userEvents.includes(eventId);
    }

    const darkmodeSwitch = () => {


        if(localStorage.theme === undefined){
            localStorage.theme = "light";
            return;
        }

        document.body.classList.remove(localStorage.theme);
        localStorage.theme == "light" ? localStorage.theme = "dark" : localStorage.theme= "light";
        document.body.classList.add(localStorage.theme);

    }
    

    return(
        <div>
            <Navbar/>

        <div class="flex flex-col justify-center ml-3">
            <button onClick={darkmodeSwitch} className="cursor-pointer">
                <svg class="dark:hidden" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill-slate-300" d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" />
                    <path class="fill-slate-400" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
                </svg>
                <svg className="hidden dark:block" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path className="fill-slate-400" d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
                    <path
                    className="fill-slate-500"
                    d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
                    />
                </svg>
            </button>

        </div>
            <section class="px-15 py-10">
                <div class="flex items-center">
                    <h1 class="dark:bg-red-50 font-pop text-5xl font-medium">Events Homepage</h1>
                </div>

                {events.map((event) => (
                    <div class="flex w-full justify-between">
                        <h1>{event.name}</h1>
                        {
                            isBooked(event.id) ? 
                            <button disabled class="cursor-not-allowed px-3 ml-5 bg-gray-200">Booked</button> :
                            <button onClick={() => bookEvent(event.id)} class="cursor-pointer px-3 ml-5 bg-blue-500">Book event</button>
                        }
                    </div>
                ))}
            </section>
        </div>
    );

}