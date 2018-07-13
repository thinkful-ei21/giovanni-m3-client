

	
> Match 3++ is a game by Giovanni Ricci. Drag to swap adjacent blocks. Match 3 in a row or column to clear them (blocks 'fall' if there are no blocks below them, and more blocks are generated in the top row). Match more than three to upgrade one. If you clear all blocks of a number, no new blocks of that number will appear. See how high you can get!

	You can find a deployed version at: https://match-three-client.herokuapp.com/

![Image](https://lh3.googleusercontent.com/02ABNnIKR9TCLewF8Dy6SKN9sJHDk4w5NMVTSy6DMjiIK03NJ_FwUzZAjha1OyiNqTCIY41r-PF32EFwA_hbEWOwfBppTs_cg8-k-xxNuqLoQpwuQjysC63KLP18oTEunuOd6tKeZLPllbEb0dbA1Jua3J5oGhfQmQH3Bnt8DfTp2AA2AFIckU74qarpNZbcTed0XF7heyBRrrB5JOIWssD7wy8XqnyfLzqV7A7jyf0WsjxL99HXbSVRGN5cu0MnbmxIslcCr6U5z6kKNiMqOqdJFe-PvD9YKfKDQNM1_6-48fTTVpmgOceYCwLOUHcU0ws1iCiP8ZIPkbQQ6sFQ7eXpr-Z16COcKkQMmfHLm0gVpNuTwdGgdC_zqZmOCgpSZ_5Fm6dquypE64bf9hFqcusNrSNu3n1P3WhCxF7cI85OvcJw59u5_l-Iq4OwSohDkFWEK7ARa_Zt1BZyK4-QTp835VDOC38JYruCO9KCqrs1VgzI0aKu8kyCxrmc0fwvW8XjckZJH9l_accwlr9zRrQUszE12W-tFd19Qjk4fUYydAh7QVYsqmr_S7zj7xxreg2iKHrVvTpbVTelaDIBFiDKtzeZSL9gbfOfXU0=w1192-h670-no)


	The Match 3 ++ client is built on React-Redux, and uses Pose for animations. The server uses express/knex for routing, passport for authentication, and mongoose to manage a mongo db. The game logic is handled in /reducers/grid with actions dispatched by /components/Game. Individual block elements, user interactions, and animations are declared by /components/Block. Login requests and score submission are handled in actions/auth.
