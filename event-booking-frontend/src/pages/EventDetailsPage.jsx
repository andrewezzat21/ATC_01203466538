import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EventCardWrapper from "../components/EventCardWrapper";
import Navbar from "../components/Navbar";

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [ticketsLeft, setTicketsLeft] = useState(0);
  const [users, setUsers] = useState([]);
  const [randomEvents, setRandomEvents] = useState([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        let response = await fetch(
          "http://localhost:8080/api/v1/events/" + eventId + "/details",
          {
            method: "GET",
          }
        );
        let data = await response.json();
        console.log(data.data.event);
        setEventDetails(data.data.event);
        setTicketsLeft(data.data.ticketsLeft);
        setUsers(data.data.users);

        response = await fetch(
          "http://localhost:8080/api/v1/categories/" +
            data.data.event.category.id +
            "/events",
          {
            method: "GET",
          }
        );
        data = await response.json();
        setRandomEvents(getRandomItems(data.data, 50));
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchEventDetails();
  }, [eventId]);
  console.log(eventDetails);

  function getRandomItems(arr, count) {
    const copy = [...arr];
    const actualCount = Math.min(count, copy.length);
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, actualCount);
  }

  if (!eventDetails) {
    return <Navbar />;
  }
  return (
    <>
      <Navbar />
      <div className="h-100 w-full -z-10 top-0 bg-blue sticky"></div>
      <section className=" animate-appear -mt-40 pb-50 px-30 font-pop">
        <div className="w-full flex justify-between h-150 bg-blue ">
          <div className="  w-1/2 h-full ">
            <img
              src={eventDetails.image}
              alt="Event"
              className=" h-full w-full top-0 left-0 object-cover object-bottom z-0"
            />
          </div>
          <div className="animate-appear2 px-5 py-7 flex flex-col justify-center w-1/2  border-3  border-blue ml-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <span class="relative flex size-3">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex size-3 rounded-full bg-sky-500"></span>
              </span>
              <Link
                to={`/events?category=${eventDetails.category.id}`}
                className="hover:opacity-60 transition-all font-bold text-1xl"
              >
                {eventDetails.category.name}
              </Link>
            </div>
            <div className="font-bold text-5xl">{eventDetails.name}</div>
            <div className="font-bold mt-2 text-3xl mb-5">
              @ {eventDetails.venue}
            </div>
            <div className="text-3xl font-bold mb-5">
              {eventDetails.price > 0 ? eventDetails.price + " EGP" : "FREE"}
            </div>
            <div>{eventDetails.description}</div>
            <div className="flex gap-2 my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              <div>
                {new Date(eventDetails.date).toLocaleDateString()}{" "}
                {new Date(eventDetails.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className=""></div>
            </div>

            <div className="flex gap-2 mb-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                />
              </svg>
              <div>{ticketsLeft > 0 ? ticketsLeft : "No"} Tickets Left</div>
            </div>

            {localStorage.getItem("token") == null ? (
              <Link
                to={"/login"}
                className="transition-all mr-2 w-full h-10 self-end rounded-sm bg-green-500 text-white font-medium px-1.5 py-1 flex items-center justify-center border-green-500 border-1 hover:text-green-500 hover:border-green-500 hover:bg-white cursor-pointer"
              >
                Book Now!
              </Link>
            ) : users.includes(Number(localStorage.getItem("userId"))) ? (
              <div className=" mr-2 w-full h-10 self-end rounded-sm bg-gray-500 text-white font-medium px-1.5 py-1 flex items-center justify-center border-gray-500 border-1">
                Already Booked!
              </div>
            ) : (
              <Link
                to={"/book/" + eventDetails.id}
                className="transition-all mr-2 w-full h-20 self-end rounded-sm bg-green-500 text-white text-2xl font-bold px-1.5 py-1 flex items-center justify-center border-green-500 border-1 hover:text-green-500 hover:border-green-500 hover:bg-white cursor-pointer"
              >
                Book Now!
              </Link>
            )}
          </div>
        </div>
        <div className="w-full h-100 mt-10 py-10 px-10 bg-blue">
          <Link
            to={`/events?category=${eventDetails.category.id}`}
            className="hover:opacity-60 transition-all mr-3 mt-5 font-bold text-4xl py-5 px-5 text-white"
          >
            Explore More {eventDetails.category.name} Events
          </Link>
          <div className="animate-appear4 flex gap-10 max-w-[100vw] overflow-x-auto scrollbar-hide px-4">
            {randomEvents.map((event) => (
              <div key={event.event.id} className="flex-shrink-0">
                <EventCardWrapper event={event} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
