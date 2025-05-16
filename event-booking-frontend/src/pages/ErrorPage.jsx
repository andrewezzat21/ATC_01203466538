import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default function ErrorPage() {
	const location = useLocation();
	const message = location.state?.message || "An unexpected error occurred.";

	return (
		<>
			<section>
				<Navbar />
				<div className="animate-appear min-h-150 font-pop w-full flex justify-center items-center">
					<div className="flex flex-col items-center gap-2">
						<div className="text-5xl font-black text-blue">
							Error!
						</div>
						<div className="text-3xl text-blue">{message}</div>
						<Link
							to={"/"}
							className="px-5 py-2 hover:bg-white border-blue border-1 hover:text-blue bg-blue rounded-sm text-white mt-4"
						>
							Go back to Homepage
						</Link>
					</div>
				</div>
				<Footer />
			</section>
		</>
	);
}
