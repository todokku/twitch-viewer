import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    stream_search_results: [],
    stream: null
  },
  mutations: {
    SET_STREAM_SEARCH_RESULTS(state, value) {
      state.stream_search_results = value;
    },
    SET_STREAM(state, value) {
      state.stream = value;
    }
  },
  actions: {
    SEARCH_STREAMS(context, payload){
      var url = `${API_BASE_URL}/streams?user_login=${payload}`;
      $.ajax({
        url: url
      })
      .then(response => {
        context.commit("SET_STREAM_SEARCH_RESULTS", response.data);
        if(context.state.stream_search_results.length == 1){
          context.dispatch("SELECT_STREAM", response.data[0]);
        }
      })
    },
    SELECT_STREAM(context, payload) {
      //188x250 - boxart
      //320x180 - thumbnail
      var stream = payload;

      var twitchGameUrl = `${API_BASE_URL}/games?id=${stream.game_id}`;
      $.ajax({
        url: twitchGameUrl
      })
      .then(response => {
        stream.game = response.data[0];
      })
      .then(() => {
        context.commit("SET_STREAM", stream);
      })
    }
  },
})
