import { useEffect, useState } from "react";
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

    return(
        <div>
            <section class="px-15 py-10">
                <div class="flex items-center">
                    <h1 class="font-pop text-5xl font-medium">Events Homepage</h1>
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