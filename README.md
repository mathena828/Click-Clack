# Click Clack

Welcome to Click Clack! 👋 Click Clack is an instant messaging and social media application designed to make online learning more immersive and engaging for students around the world. Our purpose is to encourage students to broaden their horizons through active dialogue. This is facilitated in a safe environment supervised by their instructors. Students can connect with an international community of learners and educators, explore new perspectives, and share ideas with other students. 

## Install Dependencies
1. Make sure you have MongoDB and npm/yarn prior to installing.
2. In server and client folders, run `yarn install`. 

## To Run 
1. Start a MongoDB service by running `brew services start mongodb-community@4.4`. For Linux, run `sudo service mongodb start`.
2. Seed the database by running `yarn run seed`.
2. In the server folder, run the command `yarn run server` or `yarn run dev` to start the server with hot reload.
3. In the client folder, run the command `yarn start`.

## Usage
A user can register as either a Teacher or a Student. Teachers can join and create channels wherein their students can interact with one another, while students can join existing channels with the invite codes provided by their teachers.

### Profile
The profile page shows users' information. On this page, you can join and create channels depending on wether you are a student or a teacher. Students can also review the Community Guidelines here.

### Chat
The chat page shows the channels you've joined and the messages that have been sent thus far. Here, you can send messages to start chatting with other participants within each channel.
