import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCardWrapper from "../components/EventCardWrapper.jsx";
import Navbar from "../components/Navbar";
export default function HomePage() {


    const [randomEvents, setRandomEvents] = useState([]);


    useEffect(()=>{
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/events/details',{
                    method: "GET"
                });
                const data = await response.json();
                setRandomEvents(getRandomItems(data.data, 50));
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    },[])

    function getRandomItems(arr, count) {
        const copy = [...arr];
        const actualCount = Math.min(count, copy.length);
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy.slice(0, actualCount);
    }


    return(
        <>
            <section>
                <Navbar />
                <div className=" dark:bg-navy bg-blue px-50 pt-10 pb-15  text-center w-full h-1/2 font-pop flex flex-col">
                    <div className=" border-1 py-20 px-10 border-white">
                        <div className="animate-appear text-white">
                        <div className="font-black text-7xl">EXPLORE AMAZING EVENTS AROUND YOU!</div>
                        <div className="font-light text-sm px-40 my-3 mb-5">Discover local concerts, festivals, workshops, and more all in one place. Whether you're looking for a night out or a weekend adventure, we've got something exciting waiting for you.</div>
                   
                        <div className="animate-appear2 mt-10 font-mont">
                            <Link to={"/register"} className="transition-all hover:text-blue hover:border-white hover:bg-white px-10 py-2 cursor-pointer text-white border-1 border-white rounded-2xl">Start Now!</Link>
                        </div>
                        <div className="animate-appear my-2 flex font-light justify-center text-white ">
                            <div className="text-sm my-3 mb-5">Already have an account?</div>
                            <Link to={"login"} className="text-sm my-3 mb-5 ml-1 font-bold cursor-pointer">Login now!</Link>
                        </div>
                    </div>



                    </div>
                </div>
                <div className=" dark:bg-gray-800  py-15 px-20 w-full h-1/2 font-pop flex flex-col">
                    <div className="animate-appear flex items-end dark:text-white text-blue">
                        <div className="mr-3 font-bold text-4xl">Explore Upcoming Events!</div>
                        <Link to={"/events"} className="py-0 cursor-pointer h-7 dark:hover:text-gray-200 hover:text-blue-800 font-normal text-lg">See all</Link>
                    </div>
                    <div className="animate-appear4 flex gap-10 max-w-[100vw] overflow-x-auto scrollbar-hide px-4">
                        {
                            randomEvents.map((event) => (
                                <div key={event.event.id} className="flex-shrink-0">
                                     <EventCardWrapper event={event} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    );
};
