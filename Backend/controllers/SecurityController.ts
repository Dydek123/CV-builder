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

export default class SecurityController {
    private passwordMinimalStrength: number = 2.5; // Describe password strength from 0 to 5
    private passwordMinimalLength: number = 6; // Minimal password length
    public async login_user(login_data: loginData): Promise<responseStatus> {
        if (!login_data.email || !login_data.password)
            return this.setErrorResponse('Enter email and password');
        const user = await User.findOne({email: login_data.email, password: login_data.password});
        if (!user) return this.setErrorResponse('User does not exist');
        //TODO Start session
        return this.setSuccessResponse();
    }

    public async register_user(register_data: registerData): Promise<responseStatus> {
        if (!register_data.email || !register_data.password || !register_data.repeatPassword)
            return this.setErrorResponse('Enter all data');
        if (!this.emailIsValid(register_data.email))
            return this.setErrorResponse('Entered email is not valid');
        if (register_data.password !== register_data.repeatPassword)
            return this.setErrorResponse('Repeat password is not the same');
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

    public async delete_user(email: string): Promise<responseStatus> {
        const user = await User.findOne({email});
        if (!user)
            return this.setErrorResponse('User does not exist');
        await User.remove(user);
        return this.setSuccessResponse();
    }

    public async add_user_details(detailsData: detailsI): Promise<responseStatus> {
        if (!Object.keys(detailsData).length) return this.setErrorResponse('Set some data');
        return this.createNewDetails(detailsData);
    }

    public async edit_user_details(detailsData: detailsI): Promise<responseStatus> {
        if (!Object.keys(detailsData).length) return this.setErrorResponse('Set some data');
        await this.setNewDetails(detailsData);
        return this.setSuccessResponse();
    }

    public async getUser(id: number):Promise<{ data:detailsI[] }> {
        return {data: await Details.find({id_user: id})};
    }

    public async addNewExperience(experience: experienceI): Promise<responseStatus> {
        if (!Object.keys(experience).length) return this.setErrorResponse('Set some data');
        return this.createNewExperience(experience, 1); //TODO set id_details
    }

    public async editExperience(experience: experienceI): Promise<responseStatus> {
        if (!Object.keys(experience).length) return this.setErrorResponse('Set some data');
        return this.setNewExperience(experience);
    }

    public async getExperience(id: number) {
        return await Experience.find({id_details: id});
    }

    //PRIVATE
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

    private async setNewDetails(detailsData: detailsI): Promise<void> {
        const details = await Details.findOne(1); // TODO change to id from choose
        const items = ['hard_skills', 'soft_skills', 'name', 'surname', 'email', 'phone_number', 'address', 'about', 'image', 'agreement', 'language'];
        for (const item of items) {
            details[item] = detailsData[item] || null;
        }
        details.id_user = 1 // TODO id from session
        await Details.save(details);
    }

    private async createNewDetails(detailsData: detailsI): Promise<responseStatus> {
        const details = new Details();
        const items = ['hard_skills', 'soft_skills', 'name', 'surname', 'email', 'phone_number', 'address', 'about', 'image', 'agreement', 'language'];
        //TODO check if user is logged
        for (const item of items) {
            details[item] = detailsData[item] || null;
        }
        details.id_user = 1; //TODO id from session
        await Details.save(details)

        return this.setSuccessResponse();
    }

    private async createNewExperience(experience: experienceI, id_details: number): Promise<responseStatus> {
        const newExperience = new Experience();
        const items = ['place', 'start_date', 'end_date', 'description'];
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

    private async setNewExperience(experience: experienceI): Promise<responseStatus> {
        const newExperience = await Experience.findOne(experience.id_experience);
        const items = ['place', 'start_date', 'end_date', 'description'];
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
}
