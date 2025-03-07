Node.js & PostgreSQL Products API and user login and signup
Node With Postgress..products API with list, create, update and delete(CRUD)and user authentication (signup & login)
Features
................
User Authentication
User Signup
User Login with JWT Authentication
Product Management (CRUD)
Create a Product
Get a List of Products
Update a Product
Delete a Product


Technologies Used
......................
Node.js
Express.js
PostgreSQL
bcryptjs (Password Hashing)
jsonwebtoken (JWT Authentication)
dotenv (Environment Variables)

Installation

git clone

cd products-api

Install Dependencies
////////////////////
npm install
Set Up Environment Variables
Create a .env file in the root directory and add:

env
PORT=5000

DATABASE_URL=postgres://user:password@localhost:5432/your_database
JWT_SECRET=your_secret_key


Start the Server
////////////////////////
npm start
The API will be running at http://localhost:port

