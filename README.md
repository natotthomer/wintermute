# WNTRMUTE

A thing.


## Getting Started

Clone the repository and then

```
cd wintermute
brew update
npm install
npm run webpack-watch
```

The last 2 commands are to set up and then execute the Webpack bundler. Now we spin up the server:

```
bundle install
sh scripts/create_db.sh && sh scripts/migrate.sh
rackup
```

This server acts as both web server and API server. There is a chance we may want/need to split these services up, with the web server interfacing with a separate state machine for app data.

NOTE: The `create_db` & `migrate` scripts only need to be run the first time you've spun up, or when needed to troubleshoot


### Prerequisites

You will need:
  * [Node.js installed](https://nodejs.org/en/download/)


## Built With

* [React](https://reactjs.org/)
* [Webpack](https://webpack.js.org/)
* [React Typist](https://github.com/jstejada/react-typist)
* [Sinatra](http://sinatrarb.com/)
* [Sequel](https://github.com/jeremyevans/sequel)
* [Postgres](https://www.postgresql.org/) (Ruby [pg gem](https://bitbucket.org/ged/ruby-pg/wiki/Home))
* [BCrypt](https://www.npmjs.com/package/bcrypt)


## Next up

* Add database
* Set up development & production environments locally
  * server reloading tool (Shotgun, Rerun)
* Set up Amazon EC2 and DB
* Set up User model & auth
  * sessions
  * Arrive at site:
    * If user && session, log in & welcome back ==> prompt for correct user
    * otherwise, prompt for log in
    * can opt out of log in; gives random user id
      * can we come up with a way of saving that user id in memory
* New styles/style guide


## Authors

* **Nathaniel Ott Homer** - *React/Webpack/Sinatra* - [Nathaniel Ott Homer](https://github.com/natotthomer)
* **Christopher Norris** - *Initial work* - [Alder Studio](https://github.com/alder-studio)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
