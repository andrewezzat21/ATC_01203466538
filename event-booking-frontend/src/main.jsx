import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Title from "./components/Title.jsx";
import "./index.css";
import AdminPage from "./pages/AdminPage.jsx";
import Checkout from "./pages/Checkout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import EventDetailsPage from "./pages/EventDetailsPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SuccessPage from "./pages/SuccessPage.jsx";
import TicketsPage from "./pages/TicketsPage.jsx";
import UnbookEvent from "./pages/UnbookEvent.jsx";
const router = createBrowserRouter([
	{
		path: "/admin",
		element: (
			<PrivateRoute role="ADMIN">
				<Title title="EVNT. | Admin Dashboard">
					<AdminPage />
				</Title>{" "}
			</PrivateRoute>
		),
	},
	{
		path: "/",
		element: (
			<Title title="EVNT. | Discover New Events Around You">
				<HomePage />
			</Title>
		),
	},
	{
		path: "/error",
		element: (
			<Title title="EVNT. | Error">
				<ErrorPage />
			</Title>
		),
	},
	{
		path: "/success",
		element: (
			<Title title="EVNT. | Congratulations">
				<SuccessPage />
			</Title>
		),
	},
	{
		path: "/events",
		element: (
			<Title title="EVNT. | Explore Events">
				<EventsPage />
			</Title>
		),
	},
	{
		path: "/login",
		element: (
			<Title title="EVNT. | Sign in">
				<LoginPage />
			</Title>
		),
	},
	{
		path: "/register",
		element: (
			<Title title="EVNT. | Sign Up">
				<RegisterPage />
			</Title>
		),
	},
	{
		path: "/book/:eventId",
		element: (
			<Title title="EVNT. | Book Ticket">
				<Checkout />
			</Title>
		),
	},
	{
		path: "/cancel/:eventId",
		element: (
			<Title title="EVNT. | Cancel Ticket">
				<UnbookEvent />
			</Title>
		),
	},
	{
		path: "/events/:eventId",
		element: (
			<Title title="EVNT. | Event Details">
				<EventDetailsPage />
			</Title>
		),
	},
	{
		path: "/tickets",
		element: (
			<PrivateRoute role="USER">
				<Title title="EVNT. | My Tickets">
					<TicketsPage />
				</Title>
			</PrivateRoute>
		),
	},
	{
		path: "*",
		element: (
			<Title title="EVNT. | Page Not Found!">
				<ErrorPage />
			</Title>
		),
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);

router.subscribe(() => {
	window.scrollTo(0, 0);
});
