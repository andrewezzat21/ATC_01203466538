import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
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
				<div className=" dark:bg-navy px-20  my-20 font-pop">
					<div className="text-blue font-bold mx-40 text-3xl">
						Are you sure?
					</div>
					<div className="text-blue font-bold mx-40 text-3xl">
						You are about to cancel your ticket for this event
					</div>

					<div className="font-pop mx-40 mt-5  flex  rounded-xl h-40 items-center dark:bg-gray-800 dark:text-white bg-blue text-white">
						<div className="w-50 h-full">
							<img
								src={eventDetails.image}
								alt="image"
								className="object-cover w-full h-full object-center"
							/>
						</div>
						<div className="py-2 px-2 flex justify-between border-dashed border-white border-1 my-4 mx-4 w-full">
							<div className=" font-bold text-2xl  px-3 py-2">
								{" "}
								<div className=" ">
									Event Name: {eventDetails.name}
								</div>
								<div className=" ">
									Location: {eventDetails.venue}
								</div>
								<div className="">
									Date:{" "}
									{new Date(
										eventDetails.date
									).toLocaleDateString("en-GB")}{" "}
									{new Date(
										eventDetails.date
									).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</div>
							</div>
							<div className="flex items-end text-5xl font-black px-5">
								{eventDetails.price > 0
									? eventDetails.price + " EGP"
									: "FREE"}
							</div>
						</div>
					</div>
					<div className="flex w-full justify-end px-40">
						<button
							onClick={cancelTicket}
							className="mt-3 cursor-pointer bg-red-500 border-white border-1 hover:text-red-500 hover:bg-white hover:border-1 hover:border-red-500 py-2 px-5 text-white rounded-lg bg-red"
						>
							Cancel Ticket
						</button>
					</div>
				</div>
				<Footer />
			</section>
		</>
		// <>
		// 	<section>
		// 		<Navbar />
		// 		<div className="bg-blue dark:bg-navy h-dvh px-20 py-30 font-pop">
		// 			<div className="text-white font-bold text-3xl">
		// 				Are you sure?
		// 			</div>
		// 			<div className="text-white font-bold text-3xl">
		// 				You are about to cancel your ticket for this event
		// 			</div>
		// 			<div className="font-pop mt-5 px-5 py-5 dark:bg-gray-800 dark:text-white bg-white text-blue">
		// 				<div className=" font-bold text-3xl">
		// 					Event Name: {eventDetails.name}
		// 				</div>
		// 				<div className=" font-bold text-3xl">
		// 					Location: {eventDetails.venue}
		// 				</div>
		// 				<div className=" font-bold text-3xl">
		// 					Date:{" "}
		// 					{new Date(eventDetails.date).toLocaleDateString(
		// 						"en-GB"
		// 					)}{" "}
		// 					{new Date(eventDetails.date).toLocaleTimeString(
		// 						[],
		// 						{ hour: "2-digit", minute: "2-digit" }
		// 					)}
		// 				</div>
		// 				<div className=" font-bold text-3xl">
		// 					Price:{" "}
		// 					{eventDetails.price > 0
		// 						? eventDetails.price + " EGP"
		// 						: "FREE"}
		// 				</div>

		// 			</div>
		// 		</div>
		// 	</section>
		// </>
	);
}
