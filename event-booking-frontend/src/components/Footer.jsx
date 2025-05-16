import { Link } from "react-router-dom";
export default function Footer() {
	return (
		<>
			<footer className="py-10 px-20 bg-blue dark:bg-navy text-white z-10 flex justify-between items-center ">
				<div>
					<h1 className="cursor-pointer text-md font-black text-white">
						<Link to="/">EVNT.</Link>
					</h1>
					<div className="text-white font-mont">
						© Andrew Ezzat 2025
					</div>
					<div className="flex gap-5">
						<a
							href="https://www.linkedin.com/in/andrew--ezzat/"
							target="_blank"
						>
							Linkedin
						</a>
						<a
							href="https://github.com/andrewezzat21"
							target="_blank"
						>
							Github
						</a>
					</div>
					<div className="flex gap-5 mt-10">
						<Link to={"/"}>Home</Link>
						<Link to={"/events"}>Events</Link>
						<Link to={"/events"}>About Us</Link>
						<Link to={"/events"}>Contact</Link>
						<Link to={"/events"}>Careers</Link>
					</div>
				</div>

				<div className="w-fullfont-pop  bg-blue rounded-sm text-white dark:bg-navy flex flex-col px-20">
					<div className="font-bold text-4xl">Stay connected?</div>
					<div className="mb-4">
						Be the first to know about new events near you.
					</div>
					<div className="mb-2">
						Sign up for event alerts and personalized
						recommendations.
					</div>
					<div className="flex items-center justify-between gap-4 ">
						<input
							className=" flex-grow appearance-none   bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none"
							type="text"
							placeholder="Enter your Email.."
						/>
						<button className="py-2 cursor-pointer hover:bg-white hover:text-blue font-bold px-2 border-1 border-white">
							Sign Up Now
						</button>
					</div>
				</div>
			</footer>
		</>
	);
}
