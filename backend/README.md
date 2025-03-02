1️⃣ Prerequisites
Before running the API, ensure you have the following installed:

Node.js (v14 or later)
npm (comes with Node.js)
Setup & Installation
Follow these steps to set up and run the API:

git clone https://github.com/yourusername/task-api.git
cd task-api

Step 2: Install Dependencies
npm install

Step 3: Start the Server
npm start

 3️⃣ API Routes & Usage
This API supports three operations:

Fetching all tasks (GET /api/tasks)
Adding a new task (POST /api/tasks)
Deleting a task by ID (DELETE /api/tasks/:id)

Route Details
Method	Endpoint	Description
GET	/api/tasks	Fetch all tasks
POST	/api/tasks	Add a new task
DELETE	/api/tasks/:id	Delete a task by ID

5️⃣ Testing the API
Once the server is running, you can test the API using:

A) Using CURL (Command Line)
✅ Fetch All Tasks
curl -X GET http://localhost:5000/api/tasks

✅ Add a New Task
curl -X POST http://localhost:5000/api/tasks -H "Content-Type: application/json" -d '{"name":"Complete Node.js project"}'

✅ Delete a Task by ID (Example: Delete Task 1)
curl -X DELETE http://localhost:5000/api/tasks/1

Using Postman
Open Postman
Create a new request
Use the following details:
GET request to http://localhost:5000/api/tasks
POST request to http://localhost:5000/api/tasks with JSON body:
DELETE request to http://localhost:5000/api/tasks/1
Click Send and check responses.
