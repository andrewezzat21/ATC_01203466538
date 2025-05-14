import { Link } from "react-router-dom";
export default function Footer() {
	return (
		<>
			<footer className="py-10 px-20 bg-navy text-white">
				<h1 className="cursor-pointer text-md font-black text-white">
					<Link to="/">EVNT.</Link>
				</h1>
				<div className="text-white font-mont">© Andrew Ezzat 2025</div>
				<div className="flex gap-5">
					<a
						href="https://www.linkedin.com/in/andrew--ezzat/"
						target="_blank"
					>
						Linkedin
					</a>
					<a href="https://github.com/andrewezzat21" target="_blank">
						Github
					</a>
				</div>
			</footer>
		</>
	);
}
