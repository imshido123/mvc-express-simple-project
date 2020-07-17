# MVC: Express Simple Project with MongoDb connection

Express Project using MVC model with a minimum set of dependencies to get up to speed, connecting to MongoDb.

## List of installed dependencies:
* **Express** to implement a simple CRUD API
* **DotEnv** to control environmental variables 
* **NodeMon** to setup a local server
* **MongoDB** to enable connection to a non-relational DB

## To use
* Install all dependencies
    ```
    npm install
    ```
* Create an _.env_ file to setup your own connection to your MongoDB cluster: use the file _.env.example_ as the base to configure all you need.
    ```
    PORT=
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_PORT=
    DB_NAME=
    ```
* Run the project
    ```
    npm run dev
    ```

To see what routes are available, please refer to the _index.js_ and _./routes/api/product.js_ files.