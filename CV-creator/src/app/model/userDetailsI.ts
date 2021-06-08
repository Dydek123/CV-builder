import ExperienceI from "./experienceI";

export default interface UserDetailsI {
  id_detail?: number,
  id_user?: number,
  hard_skills?: string,
  soft_skills?: string,
  name?: string,
  surname?: string,
  email?: string,
  phone_number?: number,
  address?: string,
  about?: string,
  image?: string,
  agreement?: boolean,
  language?: string
  experience?: ExperienceI[]
}
