# Hello World

## Install dependencise
1. Must have MongoDB and npm/yarn prior to installing
2. In server folder run `yarn install`. Run the same command on the client folder.

## Start 
1. Start a MongoDB service by running `brew services start mongodb-community@4.4`.
    - For Linux, run `sudo service mongodb start`
2. In the server folder, run the command `yarn run server`.
    - `yarn run dev` to start server with hot reload
    * To seed database, run the command `yarn run seed` before running the server
3. In the client folder, run the command `yarn start`.
