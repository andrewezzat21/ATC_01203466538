import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Checkout() {

    const { eventId } = useParams(); 
    const [eventDetails, setEventDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
          const fetchEventDetails = async () => {
              try {
                  let url = 'http://localhost:8080/api/v1/events/' + eventId;
                  let response = await fetch(url, {  
                  });
                  let data = await response.json();
                  setEventDetails(data.data);
              } catch (error) {
                  console.error('Error fetching events:', error.message);
              }
          };
          fetchEventDetails();
  
    },[eventId])
  

    const bookEvent = async () => {

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
                navigate("/error", { state: { message: data.message } });
            } else {
                navigate("/success")
            }

        } catch (error) {
            console.error('Error Booking The event:', error.message);
        }

    }
  

  return(

    <>
        <section>
            <Navbar/>
            <div className='bg-blue h-dvh px-20 py-30 font-pop'>
                <div className='text-white font-bold text-3xl'>Are you sure?</div>
                <div className='text-white font-bold text-3xl'>You are about to buy one ticket for this event</div>
                <div className='font-pop mt-5 px-5 py-5 bg-white text-blue'>
                    <div className=' font-bold text-3xl'>Event Name: {eventDetails.name}</div>
                    <div className=' font-bold text-3xl'>Location: {eventDetails.venue}</div>
                    <div className=' font-bold text-3xl'>Date: {new Date(eventDetails.date).toLocaleDateString()} {new Date(eventDetails.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    <div className=' font-bold text-3xl'>Price: {eventDetails.price > 0 ? eventDetails.price + " EGP" : "FREE"}</div>
                    <button onClick={() => bookEvent()} className='mt-3 cursor-pointer border-blue border-1 hover:text-blue hover:bg-white hover:border-1 hover:border-blue py-2 px-5 text-white rounded-lg bg-blue'>Buy Ticket</button>
                </div>
            </div>

        </section>
    </>

  );
    
};
