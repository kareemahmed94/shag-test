export const state = () => ({
  singleJobData: {}
})

export const getters = {
  getJob() {
    return state.singleJobData
  }
}

export const mutations = {
  addJobData(state, payload) {
    state.singleJobData = payload
  },
}

export const actions = {
  async getJob({ commit },params) {
    let slug = encodeURIComponent(params.params.id)
    return await this.$axios.get('/job/jobs/show/' + slug)
      .then(response => {
        commit('addJobData', response.data.data.job_data)
        return response.data.data.job_data
      })
  },
}
