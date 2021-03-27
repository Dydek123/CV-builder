import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import * as express from 'express';
import {Style} from "./entity/Style";
import {Server} from "./Sever";

const app = express();

createConnection().then(async connection => {
    const server = new Server(app);
    let port = parseInt(process.env.PORT || '');
    if(isNaN(port) || port ===0 ) port= 8080;
    server.start(port);
    // console.log("Inserting a new user into the database...");
    // const style = new Style();
    // style.main_color = 'red'
    // style.font = 'Arial'
    // await connection.manager.save(style);
    // console.log("Saved a new user with id: " + style.id_style);
    //
    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");
    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.id_details = 1;
    // user.login = "John";
    // user.password = "asd";
    // user.email = 'john_snow@wp.pl';
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id_user);
    //
    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);
    //
    // console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
