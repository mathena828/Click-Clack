# Click Clack

Welcome to Click Clack! A messaging and social media app for students to get to know what life is like from other kids across the world. The site's purpose is to encourage students to broaden their horizons through dialogue with others in a safe environment. Students can connect with an international community of learners and educators, explore new perspectives, and share ideas with other students. 

## Install dependencise
1. Must have MongoDB and npm/yarn prior to installing
2. In server folder run `yarn install`. Run the same command on the client folder.

## To Run 
1. Start a MongoDB service by running `brew services start mongodb-community@4.4`.
    - For Linux, run `sudo service mongodb start`
2. Seed the database by running `yarn run seed`
2. In the server folder, run the command `yarn run server`.
    - `yarn run dev` to start server with hot reload
3. In the client folder, run the command `yarn start`.

## Navigate
When registering, a user can be either a Teacher or a Student. Teachers can join and create channels for their students to interact with one another, and students can join those channels once their teacher provides them with the correct channel code. All channels are supervised by the teachers to make sure conversation stays on topic.

### Profile
The profile page shows the user's information provided upon registration. On this page they can also create or join a channel, depending if they are teachers or students.

### Chat
The chat page shows the channels you've joined and how the conversations are going for each channel.