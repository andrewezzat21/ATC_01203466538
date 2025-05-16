import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
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

	return (
		<>
			<section className="">
				<Navbar />
				<div className=" dark:bg-navy bg-blue pattern px-15 pt-10 pb-15 w-full h-1/2 font-pop flex flex-col">
					<div className="px-10 ">
						<div className="animate-appear text-white">
							<div className="font-black text-5xl mb-3">
								My Tickets
							</div>
							<div>
								Welcome Back,{" "}
								{localStorage.getItem("firstName")}! Here are
								your upcoming booked events.
							</div>
						</div>
					</div>
				</div>
				{events.length > 0 ? (
					<div>
						<div className="animate-appear2 px-25 py-10 font-pop min-h-100">
							{events.map((event) => (
								<div
									key={event.id}
									className="flex text-white justify-between mb-1 dark:bg-navy bg-blue py-2 px-5"
								>
									<div className="flex gap-4 items-center">
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

										<div className="font-bold">
											{event.name}
										</div>
										<div>@{event.venue}</div>
										<div>
											{new Date(
												event.date
											).toLocaleDateString("en-GB")}{" "}
											{new Date(
												event.date
											).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})}
										</div>
									</div>
									<div className="flex gap-4 text-sm">
										<Link
											to={"/events/" + event.id}
											className="transition-all py-2 px-2 dark:bg-navy bg-blue text-white hover:bg-white hover:border-white hover:text-blue border-1 border:blue"
										>
											View Event Details
										</Link>
										<Link
											to={"/cancel/" + event.id}
											className="transition-all cursor-pointer py-2 px-2 bg-red-500 text-white hover:bg-white hover:border-white hover:text-red-500 border-1 border:red-500"
										>
											Delete Ticket
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				) : (
					<div className="animate-appear2 dark:text-white flex flex-col gap-4 items-center w-full justify-center py-20 min-h-100 font-pop">
						<div>
							You haven’t booked any tickets yet. Start exploring
							events now!
						</div>
						<Link
							to={"/events"}
							className="font-mont  font-bold transition-all hover:text-white hover:border-blue hover:bg-blue px-10 py-2 cursor-pointer text-blue border-1 border-blue rounded-2xl"
						>
							Explore Events
						</Link>
					</div>
				)}
				<Footer />
			</section>
		</>
	);
}
