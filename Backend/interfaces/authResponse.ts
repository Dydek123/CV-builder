import {User} from "../../CV-creator/src/app/model/User";

export default interface authResponse {
    status: string,
    errors: string[],
    user: User
}
