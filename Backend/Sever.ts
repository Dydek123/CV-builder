import * as express from "express";
import {Express, Router} from "express";
import * as path from "path";
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import {IndexRouter} from "./routes/IndexRouter";

export class Server {
    private app: Express;
    private router: Router = express.Router();

    constructor(app: Express) {
        this.app = app;

        this.app.use(express.static(path.resolve("/") + '/build/frontend'));
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT, OPTIONS')
            next();
        }))
        this.app.use(cookieParser());
        const indexRouter = new IndexRouter(this.router);
        this.app.use('/', indexRouter.router);

        // this.app.get("*", (req: Request, res: Response): void => {
        //     res.send('Hello from routing');
        //     // res.sendFile(path.resolve("./" + 'build/frontend/index.html'))
        // })

    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on http://localhost:${port}`))
    }
}
