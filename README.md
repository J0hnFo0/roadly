
<h1>Abwasser-Express - Next Level Fahrtenplanung</h1>

Abwasser-Express is a fullstack application implementing REST and full CRUD.

## Technology stack

The project has a client and server side. 

### Server:
<ul>
  <li>Node.js</li>
<li>Express</li>
<li>MongoDB</li>
<li>Mocha</li>
<li>Chai</li>
</ul>

### Client:
<ul>
<li>HTML</li> 
<li>CSS</li>
<li>Bootstrap</li>
<li>Javascript</li>
<li>React</li>
</ul>

<h2>Setup and Execution</h2>

Fork and clone this repository to your local machine.

### Ports:

* Client: `3000`
* Server: `3036`

### Automated setup with Docker and docker-compose:

The fastest way to setup and test the application is the included Docker and docker-compose setup. Therefore only a recent version of [Docker](https://docs.docker.com/install/) is required on the local machine.

Follow these steps to get it up and running:

1. Execute `docker-compose up` (or `docker-compose up -d` for Deamon mode) in the root directory of the application.
2. Everything spins up. It can take between 2-3 minutes until everything is ready.
3. Add seed data into the database by running the following command: `$ docker-compose run server node bin/seeds.js` (Could also be skipped if no demo/seed data is needed) 
4. That's it. Visit [http://localhost:3000](http://localhost:3000) and try out the application.
5. (OPTIONAL) To shut down the Docker setup just execute `docker-compose down`.  

### Manual setup:

A recent version Node.JS and MongoDB are required. Therefore:

* Install the current version of Node.js on your computer.
* Install the current version of MongoDB on your compuer.
* For Windows OS: Install as a service
* For Linux OS: After installation start MongoDB service by opening a terminal and type *mongod* 

<ul>
<li>Install server dependencies with <i>server/npm i</i></li>
<li>Bootstrap db with node <i>server/bin/seeds.js</i></li>

<li>Install client dependencies with <i>client/npm i</i></li>

<li>Run server on port 3036 with <i>server/nodemon</i> or <i>server/npm start</i></li>
<li>Run client on port 3000 with <i>client/npm start</i></li>
</ul>

<h2>Unit Testing</h2>

Unit tests will be added successively.

<h3>Serverside Testing</h3>

The backend is tested with Mocha and Chai. Tests are located in <i>server/test</i>.

Tests can be started with <i>cd server/mocha</i> or <i>cd server/npm run test</i>.

