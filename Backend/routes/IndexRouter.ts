import {Express, Request, Response, Router, Application} from "express";
import * as express from 'express';
import * as path from "path";
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import {User} from "../entity/User";
import SecurityController from "../controllers/SecurityController";
import loginData from "../interfaces/loginData";
import responseStatus from "../interfaces/responseStatus";
// import SecurityController from "../Controllers/SecurityController"

export class IndexRouter {
    public router: Router;
    private securityController = new SecurityController();
    constructor(router: Router) {
        this.router = router;
        this.router.post('/login', async (req: Request, res: Response): Promise<void> => {
            const body: loginData = req.body;
            const response:responseStatus =  await this.securityController.login_user(body);
            res.json(response);
        })

        // this.router.post('/register', async (req: Request, res: Response): Promise<void> => {
        //     const body: registerData = req.body
        //     const securityController = new SecurityController();
        //     const user = await securityController.new_user(body.login, body.password, body.email);
        //     res.json(user);
        // })
    }

    private isEmptyLogin = (login:string, password:string):boolean => {
        if (!login || !password){
            return true;
        }
    }
}
