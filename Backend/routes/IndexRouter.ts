import {Request, Response, Router} from "express";
import SecurityController from "../controllers/SecurityController";
import loginData from "../interfaces/loginData";
import responseStatus from "../interfaces/responseStatus";
import registerData from "../interfaces/registerData";
import updateData from "../interfaces/updateData";
import detailsI from "../interfaces/detailsI";
import experienceI from "../interfaces/experienceI";
import CvController from "../controllers/CvController";
import stylesI from "../interfaces/stylesI";

export class IndexRouter {
    public router: Router;
    private securityController = new SecurityController();
    private cvController: any = new CvController();

    constructor(router: Router) {
        this.router = router;

        //User
        this.router.post('/login', async (req: Request, res: Response): Promise<void> => {
            const body: loginData = req.body;
            const response: responseStatus = await this.securityController.login_user(body);
            res.json(response);
        })

        this.router.post('/register', async (req: Request, res: Response): Promise<void> => {
            const body: registerData = req.body;
            const response: responseStatus = await this.securityController.register_user(body);
            res.json(response);
        })

        this.router.put('/updatePassword', async (req: Request, res: Response): Promise<void> => {
            const body: updateData = req.body;
            const response: responseStatus = await this.securityController.updatePassword(body);
            res.json(response);
        })

        this.router.delete('/removeUser', async (req: Request, res: Response): Promise<void> => {
            const {email} = req.body;
            const response: responseStatus = await this.securityController.delete_user(email);
            res.json(response);
        })

        //Details
        this.router.post('/addDetails', async (req: Request, res: Response): Promise<void> => {
            const body: detailsI = req.body;
            const response: responseStatus = await this.securityController.add_user_details(body);
            res.json(response);
        })

        this.router.put('/editDetails', async (req: Request, res: Response): Promise<void> => {
            const body: detailsI = req.body;
            const response: responseStatus = await this.securityController.edit_user_details(body);
            res.json(response);
        })

        this.router.get('/getUserDetails', async (req: Request, res: Response): Promise<void> => {
            res.json(await this.securityController.getUser(Number(1))); //TODO id from session
        })

        //Experience
        this.router.get('/getExperience', async (req: Request, res: Response): Promise<void> => {
            const {id} = req.query
            res.json(await this.securityController.getExperience(Number(id))); //TODO id from session
        })

        this.router.post('/addExperience', async (req: Request, res: Response): Promise<void> => {
            const body: experienceI = req.body;
            const response: responseStatus = await this.securityController.addNewExperience(body);
            res.json(response);
        })

        this.router.put('/editExperience', async (req: Request, res: Response): Promise<void> => {
            const body: experienceI = req.body;
            const response: responseStatus = await this.securityController.editExperience(body);
            res.json(response);
        })

        //Styles
        this.router.get('/getStyles', async (req: Request, res: Response): Promise<void> => {
            res.json(await this.cvController.getStyles());
        })

        this.router.post('/newStyle', async (req: Request, res: Response): Promise<void> => {
            const body: stylesI = req.body;
            const response: responseStatus = await this.cvController.newStyle(body);
            res.json(response);
        })
    }
}
