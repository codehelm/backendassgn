# backendassgn
Initialize the Project

md or mkdir usermanagement
cd usermanagement
npm init -y

Install dependencies
npm install express mongoose bcryptjs jsonwebtoken body-parser

Push files/folders to Github  

echo "# backendassgn" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/codehelm/backendassgn.git
git push -u origin main

Create the Database Schema
models/User.js
models/Document.js

Create Routes and Controllers
routes/userRoutes.js
routes/adminRoutes.js

Set up the Server
index.js

Run the application
 
Invoke this mongo application
 
Run the Server
 
Test the Endpoints
Endpoints: 
•	User Endpoints: 
o	POST /register - Register a new user 

o	POST /login - User login 
 
o	POST /upload - Upload an assignment 
 
o	GET /admins- fetch all admins

Admin Endpoints:
o	POST /register - Register a new admin 
 
o	POST /login - Admin login 
 
o	GET /assignments - View assignments tagged to the admin 
 
o	POST /assignments/:id/accept - Accept an assignment 
 
o	POST /assignments/:id/reject - Reject an assignment
