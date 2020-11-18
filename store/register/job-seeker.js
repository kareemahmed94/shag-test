export const state = () => ({
  token: null,
  JSRegistrationForms: {
    personal: false,
    extra: false,
    basic: false,
    work: false,
  },
  JSRegistrationData: {
    email: '',
    education_lvl: '',
    country_id: '',
    city_id: '',
    area_id: '',
    nationality_id: '',
    first_name: '',
    last_name: '',
    gender_id: '',
    phone_number: '',
    birth_date: '',
    prevExperienceData: [],
    hasBike: '',
    hasBikeLicense: '',
    min_salary: '',
    max_salary: '',
    skills: '',
    bikeLicenseDegree: '',
    other_phone_numbers: [],
    workCategories: [],
    moving_cities : '',
    moving_country_id : '',
    shift_types: '',
    martial_status_id : '',
    seek_status_id : '',
    disability_id : '',
    find_me : '',
    public_profile : '',
    is_disability : '',
    driving_license_id : '',
    password : '',
    avatar: '',
  },
})

export const getters = {

}

export const mutations = {
  JSRegistrationPersonal (state, data) {
    state.JSRegistrationData.first_name = data.first_name
    state.JSRegistrationData.last_name = data.last_name
    state.JSRegistrationData.gender = data.gender
    state.JSRegistrationData.birth_date = data.birth_date
    state.JSRegistrationData.phone_number = data.phone_number
    state.JSRegistrationData.other_phone_numbers = data.other_phone_numbers
    state.JSRegistrationData.password = data.password
    state.JSRegistrationData.avatar = data.avatar
  },
  JSRegistrationBasic (state, data) {
    state.JSRegistrationData.education_lvl = data.education_lvl
    state.JSRegistrationData.country = data.country
    state.JSRegistrationData.city = data.city
    state.JSRegistrationData.area = data.area
    state.JSRegistrationData.nationality = data.nationality
  },
  JSRegistrationWork (state, data) {
    state.JSRegistrationData.prevExperienceData = data.prevExperienceData
    state.JSRegistrationData.hasBike = data.hasBike
    state.JSRegistrationData.hasBikeLicense = data.hasBikeLicense
    state.JSRegistrationData.min_salary = data.min_salary
    state.JSRegistrationData.max_salary = data.max_salary
    state.JSRegistrationData.skills = data.skills
    state.JSRegistrationData.driving_licence = data.driving_licence
    state.JSRegistrationData.workCategories = data.workCategories
  },
  JSRegistrationExtra (state, data) {
    state.JSRegistrationData.name = data.name
  },
}

export const actions = {

}
