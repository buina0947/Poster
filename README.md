# 1. Install MongoDB using Docker
To install MongoDB using Docker, follow these steps:
- Pull the MongoDB Docker image: Open a terminal window and execute the following command:
- Bash ```docker pull mongo:latest```
- Start a MongoDB container: Once the image is pulled, start a MongoDB container using the following command:
```docker run -d --name mongodb -p 27017:27017 mongo```
- This command will start a MongoDB container in the background and map the container's port 27017 (the default MongoDB port) to the host's port 27017. You can then connect to the MongoDB container from your host machine using a MongoDB client, such as mongo.

# 2. Install Angular (Frontend part)
To install Angular, follow these steps:
- Install Angular CLI: Execute the following command to install the Angular CLI globally:
```npm install -g @angular/cli```

# 3. Initiate the backend (Node.js&Express.js)
In the Backend folder, execute the following command to start the backend server:
```node app.js```

# 4. Initiate the frontend (Angular)
In the Frontend folder, execute the following command to start the Angular development server:
```npm start```
This will launch the Angular application on your local machine, which should connect to the running backend server.
