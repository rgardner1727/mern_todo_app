As of now, I have only started implmenting the backend REST API using Express.js

Each router function has a comment specifying an example url. 

POST requests have the following format: 
.../users: 
{
  "username": "exampleusername",
  "password": "examplepassword",
  "email": "exampleemail"
}

.../todos: 
{
  "text": "exampletext",
  "completed": true/false
}

This project uses MongoDB running in a docker container which can be run with the following commands: 
docker pull mongo
docker run --name example_container -p 27017:27017 -d mongo
