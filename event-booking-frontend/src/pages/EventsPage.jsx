import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EventCardWrapper from "../components/EventCardWrapper";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function EventsPage() {
	const [events, setEvents] = useState([]);
	const [search, setSearch] = useState("");
	const [visibleCount, setVisibleCount] = useState(7);
	const [priceFilter, setPriceFilter] = useState("all");
	const [searchParams] = useSearchParams();
	const initialCategoryId = Number(searchParams.get("category")) || 0;
	const [categoryId, setCategoryId] = useState(initialCategoryId);

	const ITEMS_PER_LOAD = 7;

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/api/v1/events/details"
				);
				const data = await response.json();
				setEvents(data.data);
			} catch (error) {
				console.error("Error fetching events:", error);
			}
		};
		fetchEvents();
	}, []);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/api/v1/categories"
				);
				const data = await response.json();
				setCategories(data.data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};
		fetchCategories();
	}, []);

	useEffect(() => {
		setVisibleCount(ITEMS_PER_LOAD);
	}, [search, categoryId]);

	const filteredEvents = events.filter((event) => {
		const matchesSearch =
			search === "" ||
			event.event.name.toLowerCase().includes(search.toLowerCase());

		const matchesCategory =
			categoryId === 0 || event.event.category.id == categoryId;

		const matchesPrice =
			priceFilter === "all" ||
			(priceFilter === "free" && event.event.price === 0) ||
			(priceFilter === "paid" && event.event.price > 0);

		return matchesSearch && matchesCategory && matchesPrice;
	});

	const visibleFilteredEvents = filteredEvents.slice(0, visibleCount);

	const handleLoadMore = () => {
		setVisibleCount((prev) =>
			Math.min(prev + ITEMS_PER_LOAD, filteredEvents.length)
		);
	};

	return (
		<>
			<section>
				<Navbar />
				<div className=" dark:bg-navy pattern bg-blue px-15 pt-10 pb-15 w-full h-1/2 font-pop flex flex-col">
					<div className="px-10 ">
						<div className="animate-appear text-white">
							<div className="font-black text-5xl mb-3">
								Discover Exciting Events
							</div>
							<div>
								Find concerts, workshops, sports, and more — all
								in one place.
							</div>
						</div>
					</div>
				</div>

				<div className=" bg-white mb-4 mx-20 mt-10 items-center px-20 py-5 rounded-sm flex justify-between dark:bg-navy ">
					<div className="relative w-full flex justify-center items-center ">
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none"
							type="text"
							placeholder="Search for upcoming events..."
							onChange={(e) => setSearch(e.target.value)}
							value={search}
						/>
					</div>

					<div className="relative w-2/6 ml-5 ">
						<select
							onChange={(e) =>
								setCategoryId(Number(e.target.value) || 0)
							}
							className="w-full font-medium bg-gray-200 text-gray-700 rounded cursor-pointer appearance-none px-3 py-2 focus:outline-none"
							value={categoryId}
						>
							<option value="0">All Categories</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
						<div className="absolute inset-y-0 right-2 px-1 flex items-center justify-between pointer-events-none">
							<svg
								className="w-4 h-4 text-gray-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
					</div>
					<div className="relative w-2/6 ml-5">
						<select
							onChange={(e) => setPriceFilter(e.target.value)}
							className="w-full font-medium bg-gray-200 text-gray-700 rounded cursor-pointer appearance-none px-3 py-2 focus:outline-none"
						>
							<option value="all">All Prices</option>
							<option value="free">Free</option>
							<option value="paid">Paid</option>
						</select>
						<div className="absolute inset-y-0 right-2 px-1 flex items-center justify-between pointer-events-none">
							<svg
								className="w-4 h-4 text-gray-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
					</div>
				</div>

				<div className="animate-appear z-0 inset-shadow-gray-500 pb-5 justify-between gap-x-0 grid grid-cols-3 place-items-center w-full px-25">
					{visibleFilteredEvents.map((event) => (
						<div key={event.event.id} className="flex-shrink-0">
							<EventCardWrapper event={event} />
						</div>
					))}
				</div>

				{filteredEvents.length === 0 && (
					<div className="text-center text-gray-500 mt-10">
						No events found.
					</div>
				)}

				<div className="flex w-full justify-center mb-20">
					{visibleFilteredEvents.length < filteredEvents.length && (
						<div
							onClick={handleLoadMore}
							className="transition-all hover:text-blue hover:border-white hover:bg-white px-10 py-2 cursor-pointer text-white border-1 border-white bg-blue rounded-sm"
						>
							Load More
						</div>
					)}
				</div>

				<Footer />
				{/* <div className="h-dvh w-10 fixed bg-blue left-0 top-0 dark:bg-navy "></div> */}
				{/* <div className="h-dvh w-10 fixed bg-blue right-0 top-0 dark:bg-navy"></div> */}
			</section>
		</>
	);
}
