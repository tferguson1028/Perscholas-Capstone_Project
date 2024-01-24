# Capstone Project Idea: A multiplayer card game

## Description
Multiplayer card game. Can have a range of players between 2-4. This may change based on implementation.

## User Auth

1. Client does not have account
2. The client will navigate to sign-up page and send information to server.
3. Server sets up account for user.
    - For this project, additional info will be added to the user schema.
4. Client now has to log in with credentials.
5. Server authenticates user.
6. User is now logged in and can play the game.
7. User can update their information using a PUT request (Profile picture)

## Gameplay Functionality

Before Game Starts:
1. Client Creating/Joining a room
    - Client makes GET request to server telling it to create a room for the game.
    - Client makes GET request using a room ID, telling server to let it join a room.
2. Creating room on server upon client request.
    - If not ID provided, create new room. 
    - If ID provided and room does not exist, reject request.
    - If ID provided, attempt join room.
3. Creating new room process on server
    - The server will call the CardAPI to make a new deck.
    - The room ID will be a hash of the the deck_id param from the CardAPI's response. 
4. The server will check periodically for more than 1 player. If so, begin game and lock room.
- If no room ID exists on the server, create a new room with said ID.

When game starts:
- Client awaits a response from the server to tell it the game started.
- Server sends a response to all users connected to the room. The message contains an instruction telling user to either await their turn signal, which will force the server or 

Client Inputs actions and those actions are sent to the server.
