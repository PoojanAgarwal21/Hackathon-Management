Hackathon Management System

A full-stack web application to manage hackathons where organizers can create events, participants can register, and admins can evaluate submissions efficiently.

Features
User Registration & Login (JWT Authentication)
Browse and apply to hackathons
Admin dashboard to manage hackathons
Multi-round submission system
Evaluation and scoring system
Query handling system
Tech Stack

Frontend:

HTML
CSS
JavaScript

Backend:

Node.js
Express.js

Database:

MongoDB

Other Tools:

JWT (Authentication)
bcrypt (Password hashing)
dotenv
Project Structure
Project/
│
├── backend1/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── test files/
├── admin guides/
├── frontend files/
└── package.json
Installation
Clone the repository
git clone <your-repo-link>
cd Project
Install backend dependencies
cd backend1
npm install
Create .env file in backend1 folder
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run the server
npm start

Server will run on:

http://localhost:5000
Testing
Use provided test files for API testing
Sample scripts included for creating test data
Modules
User Management
Hackathon Management
Application System
Evaluation System
Future Scope
UI improvement using React
Leaderboard system
Team participation
Deployment support
License

This project is for educational purposes.
