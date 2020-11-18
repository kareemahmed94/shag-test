export const state = () => ({

  JobData: {
    title: '',
    category_id: '',
    vacancies_no: '',
    shift_type_id: '',
    description: '',
    min_education_level_id: '',
    experience_level_id: '',
    min_age: '',
    max_age: '',
    require_bike_licence: '',
    require_car_licence: '',
    require_heavy_machine_licence: '',
    min_salary: '',
    max_salary: '',
    min_commission: '',
    max_commission: '',
    max_expirence_years: '',
    min_expirence_years: '',
    required_gender_id: '',
    optional_requirements_labels: [],
    optional_requirements_values: [],
    job_benefits_labels: [],
    job_benefits_values: [],
    salary_currency: '',
    show_salary: '',
    salary_period: '',
    is_disability: '',
    disability: [],
    addresses: [],
    job_type_id: '',
  },
})

export const getters = {

}

export const mutations = {
  BasicInfo (state, data) {
    state.JobData.title = data.job_name
    state.JobData.addresses = data.addresses
    state.JobData.category_id = data.category
    state.JobData.vacancies_no = data.employees_number
    state.JobData.shift_type_id = data.shift_type
    state.JobData.description = data.job_details
  },
  BasicRequirements (state, data) {
    state.JobData.min_expirence_years = data.min_exp
    state.JobData.max_expirence_years = data.max_exp
    state.JobData.min_age = data.min_age
    state.JobData.max_age = data.max_age
    state.JobData.require_car_licence = data.require_car
    state.JobData.require_bike_licence = data.require_bike
    state.JobData.require_heavy_machine_licence = data.require_heavy
    state.JobData.min_education_level_id = data.education_lvl
    state.JobData.experience_level_id = data.experience_lvl
    state.JobData.job_type_id = data.job_type
  },
  Salary (state, data) {
    state.JobData.min_salary = data.min_salary
    state.JobData.max_salary = data.max_salary
    state.JobData.salary_currency = data.currency
    state.JobData.salary_period = data.salary_period
    state.JobData.show_salary = data.show_salary
    state.JobData.min_commission = data.min_commission
    state.JobData.max_commission = data.max_commission
  },
  Extra (state, data) {
    for (let x = 0 ; x<data.job_benefits_labels.length; x++) {
      if (data.job_benefits_labels[x] == undefined) {
        delete data.job_benefits_labels[x];
      }
    }
    for (let x = 0 ; x<data.job_benefits_values.length; x++) {
      if (data.job_benefits_values[x] == undefined) {
        delete data.job_benefits_values[x];
      }
    }
    for (let x = 0 ; x<data.optional_requirements_values.length; x++) {
      if (data.optional_requirements_values[x] == undefined) {
        delete data.optional_requirements_values[x];
      }
    }
    for (let x = 0 ; x<data.optional_requirements_labels.length; x++) {
      if (data.optional_requirements_labels[x] == undefined) {
        delete data.job_benefits_labels[x];
      }
    }
    state.JobData.required_gender_id = data.required_gender
    state.JobData.is_disability = data.is_disability
    state.JobData.disability = data.disability
    state.JobData.optional_requirements_labels = data.optional_requirements_labels
    state.JobData.optional_requirements_values = data.optional_requirements_values
    state.JobData.job_benefits_labels = data.job_benefits_labels
    state.JobData.job_benefits_values = data.job_benefits_values
  },
}

export const actions = {

}
