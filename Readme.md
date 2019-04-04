# ShapeGame
Built using socket.io and Vue.JS on an express framework.

Clone or download then `npm install` to install dependencies.

**NOTE:** The server uses a mysql installation to connect to the database. Alter the code in the top of the `index.js` file to suit your database needs. Create a "shapeGame" database in your MySQL server with a "channels" table. The "channels" table has a primary key "id" and a varchar "color".

## Usage
Use `nodemon` or `node index.js` and then head to `localhost:3000`
