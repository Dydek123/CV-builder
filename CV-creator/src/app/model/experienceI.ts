export default interface ExperienceI {
  id_experience?: number,
  id_details?: number,
  place?: string,
  role?: string,
  start_date?: Date | string,
  end_date?: Date | string,
  is_actual?: boolean,
  description?: string
}
