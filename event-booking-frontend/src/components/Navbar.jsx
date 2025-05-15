import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";

export default function Navbar() {
	useEffect(() => {
		darkmodeSwitch();
	}, []);

	const darkmodeSwitch = () => {
		if (localStorage.getItem("theme") == null) {
			localStorage.theme = "light";
			return;
		}
		const body = document.body;
		body.classList.remove(localStorage.theme);
		localStorage.theme = localStorage.theme === "light" ? "dark" : "light";
		body.classList.add(localStorage.theme);
	};

	const userId = localStorage.getItem("userId");

	return userId != null ? (
		<nav className=" text-md font-mont font-light">
			<div className="dark:bg-navy bg-blue text-white flex items-start justify-between  py-5 px-10 z-10 relative">
				<div className=" flex ">
					<h1 className="cursor-pointer text-md font-black text-white">
						<Link to="/">EVNT.</Link>
					</h1>
					<NavLink to={"/events"} name={"Events"} />
					<NavLink to={"/tickets"} name={"My Tickets"} />
					{localStorage.getItem("roles").includes("ADMIN") ? (
						<NavLink to={"/admin"} name={"Admin Panel"} />
					) : null}
				</div>

				<div className="flex items-center justify-between">
					<h1 className="font-mont">
						Hello, {localStorage.getItem("firstName")}!
					</h1>
					<NavLink to={"/login"} name={"Logout"} />
					<button
						onClick={darkmodeSwitch}
						className="ml-10 cursor-pointer"
					>
						<svg
							className="white dark:hidden"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								className="fill-white"
								d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
							/>
							<path
								className="fill-white"
								d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
							/>
						</svg>
						<svg
							className="white hidden dark:block"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								className="fill-white"
								d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
							/>
							<path
								className="fill-white"
								d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
							/>
						</svg>
					</button>
				</div>
			</div>
		</nav>
	) : (
		<nav className="text-md font-mont font-light">
			<div className="dark:bg-navy bg-blue text-white flex items-start justify-between  py-5 px-10 z-10 relative">
				<div className="flex ">
					<h1 className="cursor-pointer text-md font-black text-white">
						<Link to="/">EVNT.</Link>
					</h1>
					<NavLink to={"/events"} name={"Events"} />
				</div>

				<div className="flex items-center justify-between">
					<NavLink to={"/login"} name={"Login"} />
					<NavLink to={"/register"} name={"Register"} />
					<button
						onClick={darkmodeSwitch}
						className="ml-10 cursor-pointer"
					>
						<svg
							className="white dark:hidden"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								className="fill-white"
								d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
							/>
							<path
								className="fill-white"
								d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
							/>
						</svg>
						<svg
							className="white hidden dark:block"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								className="fill-white"
								d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
							/>
							<path
								className="fill-white"
								d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
							/>
						</svg>
					</button>
				</div>
			</div>
		</nav>
	);
}
