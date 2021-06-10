import * as strength from 'strength';
import loginData from "../interfaces/loginData";
import responseStatus from "../interfaces/responseStatus";
import {User} from "../entity/User";
import {Details} from "../entity/Details";
import registerData from "../interfaces/registerData";
import updateData from "../interfaces/updateData";
import detailsI from '../interfaces/detailsI';
import experienceI from "../interfaces/experienceI";
import {Experience} from "../entity/Experience";
import authResponse from "../interfaces/authResponse";
import {UserI} from "../interfaces/userI";
import signJWT from "../jwt/signJWT";
import ExperienceI from "../../CV-creator/src/app/model/experienceI";

const bcrypt = require('bcrypt');

export default class SecurityController {
    private passwordMinimalStrength: number = 2.5; // Describe password strength from 0 to 5
    private passwordMinimalLength: number = 6; // Minimal password length

    public validateToken(token):{status:boolean} {
        return {status:token.exp>Math.floor(new Date().getTime()/1000)};
    }

    public async login_user(login_data: loginData): Promise<authResponse> {
        let token: string | undefined;
        if (!login_data.email || !login_data.password)
            return this.setErrorResponseForAuth('Enter email and password');
        const user = await User.findOne({email: login_data.email});
        if (!user || await this.checkPassword(login_data.password, user.password)) {
            return this.setErrorResponseForAuth('User does not exist');
        }
        token = await signJWT(user, ((err, token) => {
            if (err) console.log('Unable to authorize');
        }))
        return this.setSuccessResponseForAuth(user, token);
    }

    public async register_user(register_data: registerData): Promise<authResponse> {
        if (!register_data.email || !register_data.password || !register_data.repeatPassword)
            return this.setErrorResponseForAuth('Enter all data');
        if (!this.emailIsValid(register_data.email))
            return this.setErrorResponseForAuth('Entered email is not valid');
        if (register_data.password !== register_data.repeatPassword)
            return this.setErrorResponseForAuth('Repeat password is not the same');
        if (!this.passwordIsStrong(register_data.password))
            return this.setErrorResponseForAuth('New password is too weak');
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

    public async delete_user(email: string): Promise<responseStatus> {
        const user = await User.findOne({email});
        if (!user)
            return this.setErrorResponse('User does not exist');
        await User.remove(user);
        return this.setSuccessResponse();
    }

    public async add_user_details(detailsData: detailsI, userEmail:string): Promise<responseStatus> {
        if (!Object.keys(detailsData).length) return this.setErrorResponse('Set some data');
        const user = await this.getUserByEmail(userEmail);
        detailsData.id_user = user.id_user;
        return this.createNewDetails(detailsData);
    }

    public async edit_user_details(detailsData: detailsI, id: number): Promise<responseStatus> {
        if (!Object.keys(detailsData).length) return this.setErrorResponse('Set some data');
        await this.setNewDetails(detailsData, id);
        return this.setSuccessResponse();
    }

    public async deleteDetail(id: number): Promise<responseStatus> {
        const detail = await Details.findOne(id);
        if (!detail)
            return this.setErrorResponse('Details does not exist');
        await Details.remove(detail);
        return this.setSuccessResponse();
    }

    public async getUser(id: number): Promise<detailsI[]> {
        return await Details.find({id_user: id});
    }

    public async getUserByEmail(email: string): Promise<UserI> {
        return await User.findOne({email: email});
    }

    public async getUserDetail(id: number): Promise<detailsI> {
        return await Details.findOne({id_detail: id});
    }

    public async detailsExist(id: number, emailFromJWT:string): Promise<boolean> {
        const detail:Details = await Details.findOne({id_detail: id});
        const user:UserI = await this.getUserByEmail(emailFromJWT);
        return detail !== undefined && detail.id_user === user.id_user;
    }

    public async getListOfUserDetails(userEmail:string): Promise<detailsI[]> {
        const user = await this.getUserByEmail(userEmail);
        return await Details.find({id_user:user.id_user});
    }

    public async addNewExperience(experience: experienceI, id:number): Promise<responseStatus> {
        if (!Object.keys(experience).length) return this.setErrorResponse('Set some data');
        return this.createNewExperience(experience, id);
    }

    public async editExperience(experience: experienceI, id:number): Promise<responseStatus> {
        if (!Object.keys(experience).length) return this.setErrorResponse('Set some data');
        return this.setNewExperience(experience, id);
    }

    public async deleteExperience(id:number): Promise<responseStatus> {
        const experience = await Experience.findOne(id);
        if (!experience)
            return this.setErrorResponse('Experience does not exist');
        await Experience.remove(experience);
        return this.setSuccessResponse();
    }

    public async getExperience(id: number): Promise<ExperienceI[]> {
        return await Experience.find({id_details: id});
    }

    //PRIVATE
    private setErrorResponse(error: string): responseStatus {
        return {status: 'error', errors: [error]};
    }

    private setErrorResponseForAuth(error: string): authResponse {
        return {status: 'error', errors: [error], email: null, token: null};
    }

    private setSuccessResponse(): responseStatus {
        return {status: 'success', errors: []}
    }

    private setSuccessResponseForAuth(user: UserI, token: string | undefined): authResponse {
        return {status: 'success', errors: [], email: user.email, token: token}
    }

    private emailIsValid(email): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    private async createUser(register_data: registerData): Promise<authResponse> {
        const user = new User();
        user.password = await bcrypt.hash(register_data.password, 10);

        user.email = register_data.email;
        try {
            await User.save(user);
            let token;
            token = await signJWT(user, ((err, token) => {
                if (err) console.log('Unable to authorize');
            }))
            return this.setSuccessResponseForAuth(user, token);
        } catch (error) {
            return this.setErrorResponseForAuth('Email is not unique');
        }
    }

    private passwordIsStrong(password: string): boolean {
        return !(strength(password) < this.passwordMinimalStrength || password.length < this.passwordMinimalLength);
    }

    private async setNewDetails(detailsData: detailsI, id: number): Promise<void> {
        const details = await Details.findOne({id_detail:id});
        const items = ['hard_skills', 'soft_skills', 'name', 'surname', 'email', 'phone_number', 'address', 'about', 'image', 'agreement', 'language'];
        for (const item of items) {
            details[item] = detailsData[item] || null;
        }
        await Details.save(details);
    }

    private async createNewDetails(detailsData: detailsI): Promise<responseStatus> {
        const details = new Details();
        const items = ['hard_skills', 'soft_skills', 'name', 'surname', 'email', 'phone_number', 'address', 'about', 'image', 'agreement', 'language', 'id_user'];
        for (const item of items) {
            details[item] = detailsData[item] || null;
        }
        await Details.save(details)

        return this.setSuccessResponse();
    }

    private async createNewExperience(experience: experienceI, id_details: number): Promise<responseStatus> {
        const newExperience = new Experience();
        const items = ['place', 'start_date', 'end_date', 'description', 'role'];
        for (const item of items) {
            newExperience[item] = experience[item] || null;
        }
        newExperience.is_actual = !experience.end_date;
        newExperience.id_details = id_details;
        try {
            await Experience.save(newExperience);
            return this.setSuccessResponse();
        } catch (error) {
            console.log(error)
            return this.setErrorResponse('Error while creating new experience');
        }
    }

    private async setNewExperience(experience: experienceI, id:number): Promise<responseStatus> {
        const newExperience = await Experience.findOne(id);
        const items = ['place', 'start_date', 'end_date', 'description', 'role'];
        for (const item of items) {
            newExperience[item] = experience[item] || null;
        }
        newExperience.is_actual = !experience.end_date;
        try {
            await Experience.save(newExperience);
            return this.setSuccessResponse();
        } catch (error) {
            console.log(error)
            return this.setErrorResponse('Error while creating new experience');
        }
    }

    private async checkPassword(enteredPassword: string, databasePassword: string): Promise<boolean> {
        return !await bcrypt.compare(enteredPassword, databasePassword);
    }

}
