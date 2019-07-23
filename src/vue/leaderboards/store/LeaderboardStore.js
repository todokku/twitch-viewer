import Vue from 'vue'
import Vuex from 'vuex'
import GamesApi from '../../api/Games.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    games: []
  },
  mutations: {
    SET_GAMES(state, value){
      state.games = value;
    }
  },
  actions: {
    GET_LEADERBOARDS(context, payload){
      GamesApi
      .getBySeriesId(payload)
      .then(response => {
        context.commit("SET_GAMES", response.data);
        this.test();
      })
    }
  }
})
