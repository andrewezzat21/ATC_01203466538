export default function AdminCard({ event, onEventUpdated, onEditClick }) {
	const eventDetails = event.event;
	const ticketsLeft = event.ticketsLeft;
	const categoryColor = colorHashFunction(eventDetails.category.id);

	const handleDelete = async () => {
		const token = localStorage.getItem("token");
		try {
			const response = await fetch(
				"http://localhost:8080/api/v1/events/" + eventDetails.id,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to delete event");
			}

			onEventUpdated();
		} catch (error) {
			alert("Error: " + error.message);
		}
	};

	function colorHashFunction(num, alpha = 0.8) {
		function hash(x) {
			x = ((x << 13) ^ x) >>> 0;
			return (x * (x * x * 15731 + 789221) + 1376312589) & 0xffffffff;
		}

		const hashed = hash(num);

		const r = (hashed & 0xff0000) >> 16;
		const g = (hashed & 0x00ff00) >> 8;
		const b = hashed & 0x0000ff;

		return `rgba(${r},${g},${b},${alpha})`;
	}

	return (
		<div className=" animate-appear3 dark:text-white font-pop my-5 h-100 w-90 border-0 rounded-lg relative overflow-hidden shadow-sm">
			<div className="bg-black h-1/2">
				<img
					src={eventDetails.image}
					alt="Event Image"
					className="h-1/2 z-0 object-cover w-full absolute"
				/>
				<div className="h-1/2 absolute top-0 opacity-55 w-full bg-black"></div>
				<div
					style={{ backgroundColor: categoryColor }}
					className="px-10 py-0.5 absolute top-5 left-5 rounded-lg text-sm font-extralight text-white"
				>
					{eventDetails.category.name}
				</div>
				<div className="px-5 absolute top-40 rounded-lg text-sm font-extralight text-white">
					{ticketsLeft > 0 ? ticketsLeft : "No"} Tickets Left!
				</div>
			</div>
			<div className=" dark:bg-gray-700 py-2 px-5 font-bold text-xs flex flex-col justify-between h-1/2">
				<div>
					<h1 className="text-lg">{eventDetails.name}</h1>
					<div className="flex w-full mt-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-5 mr-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
							/>
						</svg>
						<h1 className="font-extralight">
							{eventDetails.venue}
						</h1>
					</div>

					<div className="flex w-full mt-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-5 mr-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
							/>
						</svg>
						<h1 className="font-extralight">
							{new Date(eventDetails.date).toLocaleDateString()}{" "}
							{new Date(eventDetails.date).toLocaleTimeString(
								[],
								{ hour: "2-digit", minute: "2-digit" }
							)}
						</h1>
					</div>

					<div className="flex w-full mt-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-5 mr-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
						<h1 className="font-extralight">
							{eventDetails.price} EGP
						</h1>
					</div>
					<div class="font-extralight mt-1 max-w-full max-h-full break-words line-clamp-2">
						{eventDetails.description}
					</div>
				</div>

				<div className="flex w-full justify-between mb-2">
					<button
						onClick={() => onEditClick(eventDetails)}
						className="mr-2 w-37 self-end rounded-sm bg-blue-500 text-white font-medium px-1.5 py-1 flex items-center justify-center border-blue border-1 hover:text-blue hover:border-blue hover:bg-white cursor-pointer"
					>
						Edit
					</button>
					<button
						onClick={handleDelete}
						className=" w-37 self-end rounded-sm bg-red-500 text-white font-medium px-1.5 flex items-center py-1 justify-center border-red-500 border-1 hover:text-red-500 hover:border-red hover:bg-white cursor-pointer"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
