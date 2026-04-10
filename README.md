Final Project: MERN Stack LMS
Submitted by: Usman

Project Overview
This is my final project for the MERN Stack Web Development course. It is a Learning Management System (LMS) built from scratch. It handles role-based logins so that Admins can manage users, Instructors can create and delete courses, and Students can view and enroll in available modules. 

Tech Stack
- Frontend: React.js, React Router, Axios
- Backend: Node.js, Express.js
- Database: MongoDB (with Mongoose)
- Security: JWT for tokens and Bcrypt for password hashing

How to Run This on Your Machine
1. Extract the zip file and open two separate terminal windows.
2. In the first terminal, navigate to the "backend" folder.
3. Run `npm install` to get the dependencies. 
4. Add a .env file with your own MongoDB connection string and a JWT_SECRET, then run `node index.js`.
5. In the second terminal, navigate into the "frontend" folder.
6. Run `npm install`, and then run `npm run dev` to start the React app.

Test Accounts
To test the role-based routing, you can use these accounts. The password for all of them is: password123

- Admin Access: admin@test.com
- Instructor Access: instructor@test.com
- Student Access: student@test.com

Notes
I have included screenshots of the working dashboards and user management tables in the attached "Screenshots" folder for quick reference.
