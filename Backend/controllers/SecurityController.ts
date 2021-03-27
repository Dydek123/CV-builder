import * as strength from 'strength';
import loginData from "../interfaces/loginData";
import responseStatus from "../interfaces/responseStatus";
import {User} from "../entity/User";
import registerData from "../interfaces/registerData";
import updateData from "../interfaces/updateData";

export default class SecurityController {
    private passwordMinimalStrength: number = 2.5; // Describe password strength from 0 to 5
    private passwordMinimalLength: number = 6; // Minimal password length
    public async login_user(login_data: loginData): Promise<responseStatus> {
        if (!login_data.email || !login_data.password)
            return this.setErrorResponse('Enter email and password');
        if (!this.passwordIsStrong(login_data.password))
            return this.setErrorResponse('New password is too weak');
        const user = await User.findOne({email: login_data.email, password: login_data.password});
        if (!user) return this.setErrorResponse('User does not exist');
        //TODO Start session
        return this.setSuccessResponse();
    }

    public async register_user(register_data: registerData): Promise<responseStatus> {
        if (!register_data.email || !register_data.password || !register_data.repeatPassword)
            return this.setErrorResponse('Enter all data');
        if (register_data.password !== register_data.repeatPassword)
            return this.setErrorResponse('Repeat password is not the same');
        if (!this.emailIsValid(register_data.email))
            return this.setErrorResponse('Entered email is not valid');
        if (!this.passwordIsStrong(register_data.password))
            return this.setErrorResponse('New password is too weak');
        return await this.createUser(register_data);
    }

    public async updatePassword(updateData: updateData): Promise<responseStatus> {
        if (!updateData.email || !updateData.password || !updateData.oldPassword)
            return this.setErrorResponse('Enter email and new password');
        if (!this.passwordIsStrong(updateData.password))
            return this.setErrorResponse('New password is too weak');

        const user = await User.findOne({email: updateData.email});
        if (!user)
            return this.setErrorResponse('User does not exist');
        if (user.password !== updateData.oldPassword)
            return this.setErrorResponse('Old password is not correct');
        user.password = updateData.password;
        await User.save(user);
        return this.setSuccessResponse();
    }

    private setErrorResponse(error: string): responseStatus {
        return {status: 'error', errors: [error]};
    }

    private setSuccessResponse(): responseStatus {
        return {status: 'success', errors: []}
    }

    private emailIsValid(email): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    private async createUser(register_data: registerData) {
        const user = new User();
        user.id_details = 1;
        user.password = register_data.password;
        user.email = register_data.email;
        try {
            await User.save(user);
            return this.setSuccessResponse();
        } catch (error) {
            return this.setErrorResponse('Email is not unique');
        }
    }

    private passwordIsStrong(password: string): boolean {
        //TODO change strength condition
        return !(strength(password) < this.passwordMinimalStrength || password.length < this.passwordMinimalLength);
    }
}