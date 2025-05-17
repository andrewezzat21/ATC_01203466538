<h1 align="center">EVNT. | Event Booking Website</h1>
<img width="1440" alt="Screenshot 2025-05-17 at 3 46 54 AM" src="https://github.com/user-attachments/assets/1aa7df1c-cafb-491f-a725-8b507ae64de5" />

# 📚 Table of Contents

- [Video Tutorial](#video-tutorial)
- [Introduction](#introduction)
- [Overview](#overview)
- [Installation](#installation)
  - [Requirements](#requirements)
  - [Clone the Repo](#1---clone-the-repo)
  - [Modify Your Database URL](#2---modify-your-database-url)
  - [Run the Backend](#3---run-the-backend)
  - [Run the Frontend](#4---run-the-frontend)
- [Requirements Checklist](#requirements-checklist)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Optional Enhancements](#optional-enhancements)
  - [Bonus Features](#bonus-features)
- [Backend Documentation](#backend-documentation)
  - [Architecture](#backend-documentation)
  - [Database Schema](#database-schema)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authorization--authentication-endpoints)
    - [Categories](#categories-endpoints)
    - [Events](#events-endpoints)
    - [Tickets](#tickets-endpoints)
- [Frontend Documentation](#frontend-documentation)
  - [Routes](#website-routes)
  - [Screenshots](#screenshots)


 # Introduction
Hello 👋 I'm **Andrew Ezzat**, and this is my submission for the **Areeb Technology Competition**. I’ve built an **Event Booking Website** that covers both user and admin functionalities, and I hope you enjoy exploring it as much as I enjoyed building it!

---
## Overview

EVNT. is a full-stack web application designed to simplify the process of browsing, managing, and booking events. It provides a seamless user experience for both attendees and administrators, allowing users to explore upcoming events and book tickets with a single click, while giving admins complete control over event management. **Made for Areeb Technology's Competition**
#### Tech Stack : 
- Backend : Java - Spring Boot - MySQL
- Frontend : React + Vite - TailwindCSS - "Didn't use any ui component library"
## Installation

#### Requirements

	 1 - Java 17+
	 2 - MySQL
	 3 - Nodejs

#### 1 - Clone the repo

```
git clone https://github.com/andrewezzat21/ATC_01203466538.git
cd ATC_01203466538 
```
#### 2 - Modify your database url

in `/event-booking-backend/src/main/resources/application.yml` change these values to match your url, username and password of your MySQL server

```
spring:
	application:
		name: event-booking-backend
		
	datasource:
		url: jdbc:mysql://localhost:3306/demo_db <- (Change to your MySQL url)
		username: root <- (Change to your MySQL username)
		password: Password <- (Change to your MySQL password)
		
	flyway:  
		enabled: true  
		locations: classpath:db/migration
```
#### 3 - Run the backend

Go to the backend folder
```
cd event-booking-backend/
```
and run this command
```
./mvnw spring-boot:run
```
This will make the backend server run on port `8080`

#### 4 - Run the frontend
Open a new terminal at the frontend folder and run the these commands
```
npm install
npm run dev
```
This will make the frontend server run on port `5173`

```
Note that the admin credentials are

email : admin@evnt.com
password : admin123
```

---
## Requirements Checklist

### Frontend

#### Authentication
	✅ Users can register and log in.
#### Homepage
	✅ Display events using a grid or flexbox layout.
	✅ Events that a user has already booked will show a "Booked" label instead of the "Book Now" button.
	✅ Each event card includes a "Book Now" button (if not yet booked).
#### Event Details Page
	✅ Shows full event information:
		Event Name, Description, Category, Date, Venue, Price, and Image
	✅ Includes a "Book Now" button (books 1 ticket per click for user)
	✅ Upon booking, the user is redirected to a Congratulations screen.
#### Admin Panel
	✅ Admin can Create, Read, Update, and Delete events.
	✅ The admin panel is a separate screen within the same web application.
	✅ User roles are needed (Admin, User).
#### UI Design
	✅ Web design only (No Mobile).
### Backend
	✅ Authentication
	✅ Event Management API
	✅ Booking API
### Optional Enhancements
	✅ Role-based permissions
	✅ Tags and categories for events
	✅ Event image upload functionality
	✅ Pagination or lazy loading
	❌ Responsive design
### Bonus Features
	❌ Backend deployment (e.g., on Render, Vercel, or Heroku)
	❌ Multi-language support (Ex: English - Arabic)
	❌ Unit testing
	✅ Dark mode support

---
# Backend Documentation

The backend side is built using Java and Spring boot with a MySQL database

I've used 3 layer architecture 

```
Client <->
(
	Controller (handles http request and response from the client) <->
	Service (handles logic and validation) <->
	Data Access (handles operations on database)
) 
<-> Database
```

And I've used clean project files structure for easier code maintenance

```
/config -> application configurations
/controller -> handles http endpoints
/dto -> for data transformation between client and controllers
/entity -> database models
/exception -> for custom exceptions and runtime errors
/repository -> database access layer
/security -> for authorization and authentication configurations
/service -> for handling business logic
```
## Database schema
![Blank diagram - Page 1 EVNT  Database Schema](https://github.com/user-attachments/assets/488657b9-387b-476f-a3ce-d61f23e9eb70)

## API Endpoints
Note all the endpoints begin with `/api/v1` and all the responses follow this structure with status codes 200, 201, 400, 401, 404, 500
```
{
	message : ....
	status : ....
	timeStamp : ....
	data : []
}
```

Every endpoint is secured and it's required a token in the authorization header 
except all the `GET` endpoints and `POST : login/register` for easier testing and development

### Authorization & Authentication Endpoints

POST | `/auth/register` | Registers new user 

Request body
```
{
	"firstName" : "Andrew",
	"lastName" : "Ezzat",
	"email" : "andrew@gmail.com",
	"password" : "andrewezzat"
}
```

POST | `/auth/login` | Login to your account

Request body
```
{
	"email" : "andrew@gmail.com",
	"password" : "andrewezzat"
}
```

Response data
```
{
	"id" : "2",
	"firstName" : "Andrew",
	"lastName" : "Ezzat",
	"token" : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBldm50LmNvbSIsImlhdCI6MTc0NzQzODkyMiwiZXhwIjoxNzQ3NjExNzIyfQ.9TzIMb10HrGxxzCucmaJTdb8haPKTOQSlMsjO_rsh7I",
	"roles" : ["USER"]
}
```

### Categories Endpoints

GET | `/categories` | Get all categories
GET | `/categories/{id}` | Get category by id
GET | `/categories/{id}/events` | Get events by category id

POST | `/categories` | Create new category
Request Body
```
{
	"name" : "Sports"
}
```

PUT | `/categories/{id}` | Edit category by id
Request Body
```
{
	"name" : "Sports"
}
```

DELETE | `/categories/{id}` | Delete category by id

### Events Endpoints

GET | `/events` | Get all events
GET | `/events/{id}` | Get event by id
GET | `/events/details` | Get all events details
GET | `/events/{id}/details` | Get all event details by id

POST | `/events` | Create new event
Request Body
```
{
	"name" : "",
	"categoryId" : "",
	"description" : "",
	"date" : "",
	"venue" : "",
	"price" : "",
	"capacity" : "",
	(optional)"image" : "",
}
```

PUT | `/events/{id}` | Edit event by id
Request Body
```
{
	"name" : "",
	"categoryId" : "",
	"description" : "",
	"date" : "",
	"venue" : "",
	"price" : "",
	"capacity" : "",
	(optional)"image" : "",
}
```

DELETE | `/events/{id}` | Delete event by id
### Tickets Endpoints

GET | `/tickets/user/{id}` | Get all tickets of user
GET | `/tickets/event/{id}` | Get all users of an event

POST | `/tickets` | Create new ticket
Request Body
```
{
	"userId" : "",
	"eventId" : "",
}
```

DELETE | `/tickets/{userId}/event/{eventId}` | Delete ticket by user id and event id



# Frontend Documentation

The frontend side is built using React and TailwindCSS

I didn't use any UI Component library like shadcn or anything similar, I've tried to make everything from scratch

Although I don't consider myself as a frontend engineer, (I'm more of a backend person 😅) I tried my best in making a nice user experience and a clean user interface, but to be honest the code quality is not that great because I'm not very familiar with the frontend best practices :'(

```
IMPORTANT NOTE: I really hope you like the color blue because you will be seeing a lot of it 😅💙 The branding is inspired by Areeb Technology’s logo. And dark mode is available, featuring a more navy-toned palette
```

### Website Routes

These are the routes and pages in the website
```
"/" (Homepage)
"/login" (Login page)
"/register" (Register page)
"/admin" (Admin Panel) -> Private
"/events" (Explore Events Page)
"/events/:id" (Event Details page)
"/book/:id" (Booking an event)
"/cancel/:id" (Canceling a ticket )
"/tickets" (My Tickets Page)
"/success" (Congratulations Screen)
"/error" (Any unexpected error)
```


### Screenshots
Here are some screenshots from the website
<img width="1440" alt="Screenshot 2025-05-17 at 3 49 39 AM" src="https://github.com/user-attachments/assets/e77f40f9-8e41-48a4-afe2-903fdf0d55ec" />
<img width="1440" alt="Screenshot 2025-05-17 at 4 12 47 AM" src="https://github.com/user-attachments/assets/b10471d5-eb3d-4772-8059-f974112a07a3" />
<img width="1440" alt="Screenshot 2025-05-17 at 3 50 45 AM" src="https://github.com/user-attachments/assets/dcea10fc-6470-4cb2-b292-c297b40cdeb9" />
<img width="1440" alt="Screenshot 2025-05-17 at 3 50 26 AM" src="https://github.com/user-attachments/assets/eaf5eea9-3c6d-418e-b5c8-727a3b9de2cb" />
<img width="1440" alt="Screenshot 2025-05-17 at 3 50 59 AM" src="https://github.com/user-attachments/assets/68200025-a6d3-4c84-9f00-5455dae2fa78" />
<img width="1440" alt="Screenshot 2025-05-17 at 3 51 15 AM" src="https://github.com/user-attachments/assets/9a8bdd99-51a0-403e-b189-757010a02a45" />
<img width="1440" alt="Screenshot 2025-05-17 at 3 53 25 AM" src="https://github.com/user-attachments/assets/e58544ba-2c6e-423a-b792-da7abb85f640" />
<img width="1440" alt="Screenshot 2025-05-17 at 3 53 59 AM" src="https://github.com/user-attachments/assets/501bbede-26eb-4b6b-ae0f-4f9dfe6b6fd0" />



