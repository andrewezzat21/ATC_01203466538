import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();

	localStorage.removeItem("token");
	localStorage.removeItem("roles");
	localStorage.removeItem("userId");
	localStorage.removeItem("firstName");
	localStorage.removeItem("lastName");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formEl = event.currentTarget;
		const formData = new FormData(formEl);
		const errorMsg = document.getElementById("errorMsg");
		const jsonData = {};

		for (const [key, value] of formData.entries()) {
			jsonData[key] = value;
		}

		console.log(JSON.stringify(jsonData));

		if (jsonData["password"] != jsonData["confirmPassword"]) {
			errorMsg.textContent = "Passwords don't match!";
			errorMsg.classList.remove("hidden");
			return;
		}

		try {
			const response = await fetch(
				"http://localhost:8080/api/v1/auth/register",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(jsonData),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				errorMsg.textContent = data.message || "Something went wrong";
				errorMsg.classList.remove("hidden");
			} else {
				errorMsg.classList.add("hidden");
				navigate("/login");
			}
		} catch (error) {
			navigate("/error", { state: { message: error.message } });
		}
	};

	const togglePassword = () => setShowPassword(!showPassword);
	const toggleConfirmPassword = () =>
		setShowConfirmPassword(!showConfirmPassword);

	return (
		<div className=" w-dvw h-dvh bg-blue flex">
			<div className="h-full w-4/10 relative flex items-center justify-center">
				<img
					src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					alt=""
					className="object-cover object-center h-full w-full absolute "
				/>
				<div className="animate-appear h-full w-full bg-black absolute opacity-50"></div>
				<div className="absolute text-white font-pop flex flex-col gap-4 items-center">
					<div className="animate-appear text-4xl font-bold">
						Welcome Back
					</div>
					<div className="animate-appear mt-2 flex font-light justify-center text-white ">
						<div className="text-sm my-3 mb-5">
							Already have an account?
						</div>
						<Link
							to={"/login"}
							className="hover:opacity-80 text-sm my-3 ml-1 font-bold cursor-pointer"
						>
							Login now!
						</Link>
					</div>
				</div>
			</div>
			<div className="animate-appear h-full items-center bg-blue w-6/10 flex flex-col justify-center py-20">
				<div className="flex flex-col items-center gap-4">
					<div className="text-white font-black font-mont text-5xl">
						EVNT.
					</div>
					<div className="text-white font-normal font-mont text-3xl">
						Create a new account
					</div>
				</div>

				<form
					onSubmit={handleSubmit}
					method="post"
					className="px-30 w-full  mt-3"
				>
					<div className="flex flex-wrap -mx-3">
						<div className="w-full px-3 mb-6">
							<label
								className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
								for="firstName"
							>
								First Name
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
								name="firstName"
								type="text"
								placeholder="e.g. John"
							/>
						</div>
						<div className="w-full px-3 mb-6">
							<label
								className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
								for="lastName"
							>
								Last Name
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
								name="lastName"
								type="text"
								placeholder="e.g. Doe"
							/>
						</div>

						<div className="w-full px-3 mb-6">
							<label
								className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
								for="email"
							>
								Email
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
								name="email"
								type="email"
								placeholder="e.g. name@gmail.com"
							/>
						</div>

						<div className="w-full px-3 mb-6 relative">
							<label
								className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
								for="password"
							>
								Password
							</label>
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								placeholder="********"
								className=" appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 pr-16 mb-3 leading-tight focus:outline-none"
							/>
							<button
								type="button"
								onClick={togglePassword}
								className="cursor-pointer absolute right-10 top-[57%] translate-y-[-50%] font-bold text-sm text-blue-600  focus:outline-none"
							>
								{showPassword ? "Hide" : "Show"}
							</button>
						</div>

						<div className="w-full px-3 mb-6 relative">
							<label
								className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
								for="password"
							>
								Confirm Password
							</label>
							<input
								type={showConfirmPassword ? "text" : "password"}
								name="confirmPassword"
								placeholder="********"
								className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 pr-16 mb-3 leading-tight focus:outline-none"
							/>
							<button
								type="button"
								onClick={toggleConfirmPassword}
								className="cursor-pointer absolute right-10 top-[57%] translate-y-[-50%] font-bold text-sm text-blue-600  focus:outline-none"
							>
								{showConfirmPassword ? "Hide" : "Show"}
							</button>
						</div>

						<div className="w-full px-3  flex flex-col items-center justify-center">
							<button
								type="submit"
								className=" w-1/3 border-white border-2 hover:text-blue hover:bg-white transition-all text-white px-4 py-2 mt-3 rounded cursor-pointer"
							>
								Register
							</button>
							<p
								id="errorMsg"
								className="text-white text-xs italic hidden"
							></p>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
