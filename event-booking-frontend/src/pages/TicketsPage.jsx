import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCardWrapper from "../components/EventCardWrapper";
import Navbar from "../components/Navbar";

export default function TicketsPage() {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const userId = localStorage.getItem("userId");

		const fetchEvents = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/api/v1/tickets/user/" + userId
				);
				const data = await response.json();
				setEvents(data.data);
			} catch (error) {
				console.error("Error fetching events:", error);
			}
		};
		fetchEvents();
	}, []);
	console.log(events);

	return (
		<>
			<section>
				<Navbar />
				<div className=" dark:bg-navy bg-blue px-15 pt-10 pb-15 w-full h-1/2 font-pop flex flex-col">
					<div className="px-10 ">
						<div className="animate-appear text-white">
							<div className="font-black text-5xl">
								My Tickets
							</div>
						</div>
					</div>
				</div>
				{events.length > 0 ? (
					<div className="animate-appear2 px-25 py-10 font-pop">
						{events.map((event) => (
							<div
								key={event.id}
								className="flex border-4 justify-between mb-2 border-blue py-2 px-3"
							>
								<div className="flex gap-4 items-center">
									<div className="font-bold">
										{event.name}
									</div>
									<div>@{event.venue}</div>
									<div>
										{new Date(
											event.date
										).toLocaleDateString()}{" "}
										{new Date(
											event.date
										).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</div>
								</div>
								<div className="flex gap-4">
									<Link
										to={"/events/" + event.id}
										className="py-2 px-2 bg-blue text-white hover:bg-white hover:text-blue border-2 border:blue"
									>
										View Event Details
									</Link>
									<Link className="py-2 px-2 bg-red-500 text-white hover:bg-white hover:text-red-500 border-2 border:red-500">
										Delete Ticket
									</Link>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="animate-appear2 flex w-full justify-center py-20 font-pop">
						No Tickets Found!
					</div>
				)}
			</section>
		</>
	);
}
