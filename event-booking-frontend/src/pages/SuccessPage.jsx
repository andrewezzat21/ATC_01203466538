import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default function SuccessPage() {
	return (
		<>
			<section>
				<Navbar />
				<div className="animate-appear min-h-150 font-pop w-full flex justify-center items-center">
					<div className="flex flex-col items-center gap-2">
						<div class="w-60 h-24 border-2 border-blue mb-2 rounded-md mx-auto">
							<div class="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
								<div class="w-12 bg-gray-300 h-12 rounded-full "></div>
								<div class="flex flex-col space-y-3">
									<div class="w-36 bg-gray-300 h-6 rounded-md "></div>
									<div class="w-24 bg-gray-300 h-6 rounded-md "></div>
								</div>
							</div>
						</div>
						<div className="text-5xl font-black text-blue">
							Congratulations!
						</div>
						<div className="text-3xl text-blue">
							You have bought the ticket successfully!
						</div>
						<Link
							to={"/tickets"}
							className="px-5 py-2 hover:bg-white border-blue border-1 hover:text-blue bg-blue rounded-sm text-white mt-4"
						>
							View My Tickets
						</Link>
					</div>
				</div>
				<Footer />
			</section>
		</>
	);
}
