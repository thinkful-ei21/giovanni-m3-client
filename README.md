

	
> Match 3++ is a game by Giovanni Ricci. Drag to swap adjacent blocks. Match 3 in a row or column to clear them (blocks 'fall' if there are no blocks below them, and more blocks are generated in the top row). Match more than three to upgrade one. If you clear all blocks of a number, no new blocks of that number will appear. See how high you can get!

	You can find a deployed version at: https://match-three-client.herokuapp.com/



<img src="http://i30.photobucket.com/albums/c320/mormagli/Screenshot%20from%202018-07-13%2009-39-48.png" width="500px" display="inline-block"/>

<img src="http://i30.photobucket.com/albums/c320/mormagli/Screenshot%20from%202018-07-13%2009-40-57.png" width="300px" display="inline-block"/>


> The Match 3 ++ client is built on React-Redux, and uses Pose for animations. The server uses express/knex for routing, passport for authentication, and mongoose to manage a mongo db. The game logic is handled in /reducers/grid with actions dispatched by /components/Game. Individual block elements, user interactions, and animations are declared by /components/Block. Login requests and score submission are handled in actions/auth.
