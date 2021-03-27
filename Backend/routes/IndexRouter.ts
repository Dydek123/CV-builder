import {Express, Request, Response, Router, Application} from "express";
import * as express from 'express';
import * as path from "path";
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import {User} from "../entity/User";
// import SecurityController from "../Controllers/SecurityController"

interface loginData {
    login: string,
    password: string
}

interface registerData {
    login: string,
    password: string,
    email: string
}

export class IndexRouter {
    public router: Router;

    constructor(router: Router) {
        this.router = router;
        this.router.post('/login', async (req: Request, res: Response): Promise<void> => {
            const body: loginData = req.body
            let status: string = '';
            let errors: string[] = [];
            if(this.isEmptyLogin(body.login, body.password)){
                console.log(123)
                status = 'error';
                errors.push('Login is empty');
                res.json(errors)
            } else {
                // const securityController = new SecurityController();
                // const user = await securityController.login_user(body.login, body.password);
                res.json(body);
            }
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
