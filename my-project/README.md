# Employee Atlas

## Project Overview
Employee Atlas is a React application that fetches employee data from a public API and displays it in responsive employee cards. The project demonstrates modern React development using Hooks, reusable components, dynamic rendering, and interactive features such as search and printing.

## API Used
JSONPlaceholder Users API  
https://jsonplaceholder.typicode.com/users

## Features
- Fetch employee data using `useEffect`
- Manage state with `useState`
- Display employees using dynamic rendering with `.map()`
- Reusable `EmployeeCard` component
- Real-time search filtering by name or email
- Print all employee cards or a single card
- Download employee data as a text file
- Responsive card-based layout for mobile, tablet, and desktop

## Tech Stack
- React  
- JavaScript (ES6+)  
- CSS  
- Vite  

## Project Structure

src/
 ├── main.jsx
 ├── App.jsx
 ├── App.css
 ├── index.css
 └── components/
      └── EmployeeCard.jsx


## How to Run
1. Install dependencies  

npm install


2. Start the development server  

npm run dev

3. Open the local URL (usually http://localhost:5173)

## Learning Outcomes
This project helped practice API fetching in React, using Hooks, building reusable components, implementing search filtering, and creating responsive user interfaces.