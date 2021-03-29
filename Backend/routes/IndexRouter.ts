import {Request, Response, Router} from "express";
import SecurityController from "../controllers/SecurityController";
import loginData from "../interfaces/loginData";
import responseStatus from "../interfaces/responseStatus";
import registerData from "../interfaces/registerData";
import updateData from "../interfaces/updateData";
import detailsI from "../interfaces/detailsI";

export class IndexRouter {
    public router: Router;
    private securityController = new SecurityController();

    constructor(router: Router) {
        this.router = router;
        this.router.post('/login', async (req: Request, res: Response): Promise<void> => {
            const body: loginData = req.body;
            const response: responseStatus = await this.securityController.login_user(body);
            res.json(response);
        })

        this.router.post('/register', async (req: Request, res: Response): Promise<void> => {
            const body: registerData = req.body
            const response: responseStatus = await this.securityController.register_user(body);
            res.json(response);
        })

        this.router.put('/updatePassword', async (req: Request, res: Response): Promise<void> => {
            const body: updateData = req.body
            const response: responseStatus = await this.securityController.updatePassword(body);
            res.json(response);
        })

        this.router.delete('/removeUser', async (req: Request, res: Response): Promise<void> => {
            const {email} = req.body
            const response: responseStatus = await this.securityController.delete_user(email);
            res.json(response);
        })

        this.router.post('/addDetails', async (req: Request, res: Response): Promise<void> => {
            const body: detailsI = req.body
            const response: responseStatus = await this.securityController.add_user_details(body);
            res.json(response);
        })
    }

    private isEmptyLogin = (login: string, password: string): boolean => {
        if (!login || !password) {
            return true;
        }
    }
}
