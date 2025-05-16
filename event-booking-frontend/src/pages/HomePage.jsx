import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCardWrapper from "../components/EventCardWrapper.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar";
export default function HomePage() {
	const [randomEvents, setRandomEvents] = useState([]);
	const [randomCategories, setRandomCategories] = useState([]);
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/api/v1/events/details",
					{
						method: "GET",
					}
				);
				const data = await response.json();
				setRandomEvents(getRandomItems(data.data, 7));
				setRandomCategories(
					data.data
						.map((event) => event.event.category)
						.filter(
							(category, index, self) =>
								index ===
								self.findIndex((c) => c.id === category.id)
						)
						.slice(0, 4)
				);
			} catch (error) {
				console.error("Error fetching events:", error);
			}
		};
		fetchEvents();
	}, []);

	function getRandomItems(arr, count) {
		const copy = [...arr];
		const actualCount = Math.min(count, copy.length);
		for (let i = copy.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[copy[i], copy[j]] = [copy[j], copy[i]];
		}
		return copy.slice(0, actualCount);
	}

	return (
		<>
			<section>
				<Navbar />
				<div className=" pattern  dark:bg-navy relative bg-blue px-50 items-center justify-center text-center w-full py-25  font-pop flex flex-col">
					<div className=" py-20  px-10 ">
						<div className="animate-appear text-white">
							<div className="font-black text-7xl">
								EXPLORE AMAZING EVENTS AROUND YOU!
							</div>
							<div className="font-light text-sm px-40 my-3 mb-5">
								Discover local concerts, festivals, workshops,
								and more all in one place. Whether you're
								looking for a night out or a weekend adventure,
								we've got something exciting waiting for you.
							</div>
							{localStorage.getItem("userId") === null ? (
								<div>
									<div className="animate-appear2 mt-10 font-mont">
										<Link
											to={"/register"}
											className="transition-all hover:text-blue hover:border-white hover:bg-white px-10 py-2 cursor-pointer text-white border-1 border-white rounded-2xl"
										>
											Start Now!
										</Link>
									</div>
									<div className="animate-appear mt-2 flex font-light justify-center text-white ">
										<div className="text-sm my-3 mb-5">
											Already have an account?
										</div>
										<Link
											to={"login"}
											className="text-sm my-3 ml-1 font-bold cursor-pointer"
										>
											Login now!
										</Link>
									</div>
								</div>
							) : null}
							<div className="animate-down w-full flex justify-center">
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
										d="m19.5 8.25-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
				<div className="flex w-full flex-col justify-center items-center gap-2 mt-20  ">
					<div className="opacity-100 dark:text-white text-blue ">
						OUR TRUSTED PARTNER
					</div>
					<img
						src="https://static.wixstatic.com/media/b70f1a_e15d2ec417094f66aeed8e06a27857e0~mv2.png"
						alt="areeb logo"
						className="size-20 "
					/>
				</div>
				<div className="flex justify-center items-center ">
					<div className="w-full mx-20 mt-20 mb-15 rounded-4xl  h-100 dark:bg-navy bg-blue flex flex-col justify-center">
						<div className="animate-appear2 text-white font-bold text-4xl px-10">
							Explore. Book. Done.
						</div>

						<div className="  animate-appear2 mx-10 my-10 gap-10 flex justify-between">
							<div className="transition-all hover:scale-102  text-white flex flex-col w-1/3 items-start justify-start  ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="white"
									className="size-10"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
									/>
								</svg>
								<div className=" mt-5 text-3xl font-normal mb-3">
									Explore Events You Love
								</div>
								<div>
									Easily browse events, Whether you're looking
									for a concert, a tech talk, or a yoga
									session — we've got it all in one place.
								</div>
							</div>

							<div className="transition-all hover:scale-102 text-white flex flex-col w-1/3 items-start justify-start  ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="white"
									className="size-10"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
									/>
								</svg>

								<div className=" mt-5 text-3xl font-normal mb-3">
									Book Tickets in Seconds
								</div>
								<div className="">
									No more complicated forms. Select your
									event, and check out securely — all in just
									a few clicks.
								</div>
							</div>

							<div className="transition-all hover:scale-102 text-white flex flex-col w-1/3 items-start justify-start  ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="white"
									className="size-10"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
									/>
								</svg>

								<div className=" mt-5 text-3xl font-normal mb-3">
									Track Your Tickets Anytime
								</div>
								<div className="">
									View all your upcoming events in one
									dashboard. View or delete tickets, check
									event info — so you never miss a moment.
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full mt-5 px-20 ">
					<div className="font-bold text-4xl  dark:text-white text-blue">
						Popular Categories
					</div>
					<div className="flex justify-center mt-5 gap-10 dark:text-white  text-blue font-bold text-xl">
						{randomCategories.map((category) => (
							<Link
								to={`/events?category=${category.id}`}
								key={category.id}
								className=" transform transition duration-300  hover:scale-90 hover:shadow-2xl cursor-pointer w-1/4 dark:border-white py-2 border-2 flex justify-center items-center border-blue"
							>
								<div>{category.name}</div>
							</Link>
						))}
					</div>
				</div>

				<div className="w-full px-20 items-center py-15 mt-30 dark:bg-navy bg-blue ">
					<div className="font-bold text-4xl mb-10 text-white">
						What People Are Saying
					</div>
					<div className="flex justify-between items-center gap-10 text-white ">
						<div className="flex flex-col">
							<div className="font-normal mb-2  text-3xl">
								“I booked a ticket in less than a minute —
								smoothest experience ever!”
							</div>
							<div className="flex items-center gap-4">
								<img
									src="https://res.cloudinary.com/diha0tqnn/image/upload/v1747260102/Screenshot_2025-05-15_at_1.00.12_AM_ooxtec.png"
									className="size-15   self-end rounded-full"
								/>
								<div>— Leila A., Event Attendee</div>
							</div>
						</div>

						<div className="flex flex-col">
							<div className="font-normal mb-2 text-3xl">
								“This platform helped me find weekend events I
								never knew existed!”
							</div>
							<div className="flex items-center gap-4">
								<img
									src="https://res.cloudinary.com/diha0tqnn/image/upload/v1747260097/Screenshot_2025-05-15_at_1.00.53_AM_inypsk.png"
									className="size-15   self-end rounded-full"
								/>
								<div>— Mark R., Designer</div>
							</div>
						</div>
					</div>
				</div>

				<div className=" dark:bg-gray-800  py-15 px-20 w-full h-1/2 font-pop flex flex-col">
					<div className="animate-appear flex items-end dark:text-white text-blue">
						<div className="mr-3 font-bold text-4xl">
							Explore Upcoming Events!
						</div>
						<Link
							to={"/events"}
							className="py-0 cursor-pointer h-7 dark:hover:text-gray-200 hover:text-blue-800 font-normal text-lg"
						>
							See all
						</Link>
					</div>
					<div className="animate-appear4 flex gap-10 max-w-[100vw] overflow-x-auto scrollbar-hide px-4">
						{randomEvents.map((event) => (
							<div key={event.event.id} className="flex-shrink-0">
								<EventCardWrapper event={event} />
							</div>
						))}
					</div>
				</div>

				<div className=" px-20 font-pop flex flex-col justify-center items-center gap-4 py-20 mb-40 mt-20 mx-20 dark:border-white  dark:bg-navy border-blue border-3  bg-white ">
					<div className="font-bold text-4xl dark:text-white text-blue ">
						Ready To Go?
					</div>
					<div className="text-blue dark:text-white">
						Explore thousands of upcoming events, workshops, and
						experiences — all in one place.
					</div>
					<div className="flex gap-4 font-mont items-center">
						<Link
							to={"/register"}
							className="transition-all dark:text-white dark:border-navy hover:border-blue hover:text-blue  font-bold hover:bg-white px-10 py-2 cursor-pointer text-white bg-blue border-1 border-blue rounded-2xl"
						>
							Register Now
						</Link>
						<div className="text-white">or</div>
						<Link
							to={"/events"}
							className="transition-all hover:text-white  hover:border-blue hover:bg-blue px-10 py-2 cursor-pointer text-blue border-1 border-blue bg-white rounded-2xl"
						>
							Explore Events
						</Link>
					</div>
				</div>
				<Footer />
			</section>
		</>
	);
}
