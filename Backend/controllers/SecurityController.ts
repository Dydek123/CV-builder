import loginData from "../interfaces/loginData";
import responseStatus from "../interfaces/responseStatus";
import {User} from "../entity/User";

export default class SecurityController {
    public async login_user(login_data: loginData): Promise<responseStatus> {
        if (!login_data.login || !login_data.password)
            return this.setErrorResponse('Enter login and password');
        const user = await User.findOne({login: login_data.login, password: login_data.password});
        if (!user) return this.setErrorResponse('User does not exist');
        //TODO Start session
        return this.setSuccessResponse();
    }

    private setErrorResponse(error:string):responseStatus{
        return {status:'error', errors:[error]};
    }

    private setSuccessResponse():responseStatus{
        return {status:'success', errors:[]}
    }
}