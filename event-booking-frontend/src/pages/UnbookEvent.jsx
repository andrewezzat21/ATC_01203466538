import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function UnbookEvent() {
	const { eventId } = useParams();
	const [eventDetails, setEventDetails] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchEventDetails = async () => {
			try {
				let url = "http://localhost:8080/api/v1/events/" + eventId;
				let response = await fetch(url, {});
				let data = await response.json();
				setEventDetails(data.data);
			} catch (error) {
				console.error("Error fetching events:", error.message);
			}
		};
		fetchEventDetails();
	}, [eventId]);

	const cancelTicket = async () => {
		const token = localStorage.getItem("token");
		const userId = localStorage.getItem("userId");
		try {
			const response = await fetch(
				"http://localhost:8080/api/v1/tickets/" +
					userId +
					"/event/" +
					eventId,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await response.json();
			if (!response.ok) {
				navigate("/error", { state: { message: data.message } });
			}
			console.log(data.message);
			navigate("/tickets");
		} catch (error) {
			console.error("Error deleting the ticket:", error.message);
		}
	};

	return (
		<>
			<section>
				<Navbar />
				<div className="bg-blue dark:bg-navy h-dvh px-20 py-30 font-pop">
					<div className="text-white font-bold text-3xl">
						Are you sure?
					</div>
					<div className="text-white font-bold text-3xl">
						You are about to cancel your ticket for this event
					</div>
					<div className="font-pop mt-5 px-5 py-5 dark:bg-gray-800 dark:text-white bg-white text-blue">
						<div className=" font-bold text-3xl">
							Event Name: {eventDetails.name}
						</div>
						<div className=" font-bold text-3xl">
							Location: {eventDetails.venue}
						</div>
						<div className=" font-bold text-3xl">
							Date:{" "}
							{new Date(eventDetails.date).toLocaleDateString(
								"en-GB"
							)}{" "}
							{new Date(eventDetails.date).toLocaleTimeString(
								[],
								{ hour: "2-digit", minute: "2-digit" }
							)}
						</div>
						<div className=" font-bold text-3xl">
							Price:{" "}
							{eventDetails.price > 0
								? eventDetails.price + " EGP"
								: "FREE"}
						</div>
						<button
							onClick={cancelTicket}
							className="mt-3 cursor-pointer bg-red-500 border-white border-1 hover:text-red-500 hover:bg-white hover:border-1 hover:border-red-500 py-2 px-5 text-white rounded-lg bg-red"
						>
							Cancel Ticket
						</button>
					</div>
				</div>
			</section>
		</>
	);
}
