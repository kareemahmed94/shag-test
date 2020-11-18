export const state = () => ({
  token: null,
  EmployerRegistrationForms: {
    personal: false,
    basic: false,
  },
  EmployerData: {
    first_name: '',
    last_name: '',
    name_en: '',
    name_ar: '',
    job_title: '',
    email: '',
    phone_number: '',
    logo: '',
    country_id: '',
    city_id: '',
    area_id: '',
    tax_card: [],
    commercial_record: [],
    business_categories: [],
    other_phone_numbers: [],
    company_size_id: '',
    about: '',
    website: '',
    password: '',
  },
})

export const getters = {

}

export const mutations = {
  EmployerRegistrationContact (state, data) {
    state.EmployerData.first_name = data.first_name
    state.EmployerData.last_name = data.last_name
    state.EmployerData.job_title = data.job_title
    state.EmployerData.email = data.email
    state.EmployerData.phone_number = data.phone_number
    state.EmployerData.other_phone_numbers = data.other_phone_numbers
    state.EmployerData.password = data.password
  },
  EmployerRegistrationBasic (state, data) {
    state.EmployerData.name_en = data.company_name_en
    state.EmployerData.name_ar = data.company_name_ar
    state.EmployerData.country_id = data.country
    state.EmployerData.city_id = data.city
    state.EmployerData.area_id = data.area
    state.EmployerData.business_categories = data.business_categories
    state.EmployerData.website = data.website
    state.EmployerData.company_size_id = data.company_size
    state.EmployerData.about = data.about
    state.EmployerData.logo = data.logo
    state.EmployerData.commercial_record = data.commercial_record
    state.EmployerData.tax_card = data.tax_card

  },
}

export const actions = {

}
