import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
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
				<AdminPage />
			</PrivateRoute>
		),
	},
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/error",
		element: <ErrorPage />,
	},
	{
		path: "/success",
		element: <SuccessPage />,
	},
	{
		path: "/events",
		element: <EventsPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
	{
		path: "/book/:eventId",
		element: <Checkout />,
	},
	{
		path: "/cancel/:eventId",
		element: <UnbookEvent />,
	},
	{
		path: "/events/:eventId",
		element: <EventDetailsPage />,
	},
	{
		path: "/tickets",
		element: (
			<PrivateRoute role="USER">
				<TicketsPage />
			</PrivateRoute>
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
