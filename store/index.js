/* eslint-disable */
import Vuex from "vuex";
import Cookie from "js-cookie"

export const state = () => ({
  token: null,
  settings: {},
})

export const getters = {
  getSettings() {
    return state.settings
  }
}

export const mutations = {
  addSettings(state, payload) {
    state.settings = payload
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('getSettings')
  },
  async getSettings({ commit }) {
    return await this.$axios.get('/settings')
      .then(response => {
        commit('addSettings', response.data.data)
      })
  },
}
