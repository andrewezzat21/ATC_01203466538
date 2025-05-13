import { Link } from "react-router-dom";
import EventCard from "./EventCard";

export default function EventCardWrapper({ event }) {
  return (
    <Link to={`/events/${event.event.id}`}
      className="block transform transition duration-300 hover:scale-102 hover:shadow-2xl"
    >
      <div className="rounded-lg bg-white text-black">
        <EventCard event={event} />
      </div>
    </Link>
  );
}