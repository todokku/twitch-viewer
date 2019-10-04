import Vue from 'vue'
import Vuex from 'vuex'
import GamesApi from '../../api/Games.js'
import RunsApi from '../../api/Runs.js'
import LeaderboardsApi from '../../api/Leaderboards.js'
import Utils from '../../runs/store/utils.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    stream_search_results: [],
    game_search_results: [],
    game: {},
    leaderboards: [],
    stream: {}
  },
  mutations: {
    SET_STREAM_SEARCH_RESULTS(state, value) {
      state.stream_search_results = value;
    },
    SET_GAME_SEARCH_RESULTS(state,value){
      state.game_search_results = value;
    },
    SET_STREAM(state, value) {
      state.stream = value;
    },
    SET_GAME(state, value) {
      state.game = value;
    },
    SET_LEADERBOARDS(state, value) {
      state.leaderboards = value;
    },
    UPDATE_LEADERBOARD(state, payload){
      state.leaderboards
      .forEach(l => {
        if(!l.data) {
          console.log(l);
        }
      })

      let gameCategories =
        state.game.categories.data;

      let category =
        gameCategories.find(c => c.id == payload.data.category);

      payload.data.name = category.name;
      payload.data.runs = RunsApi.mapRunsToView(payload.data.runs, payload.data.players.data);

      //get all of the leaderboards except the one to be updated
      state.leaderboards = [
        ...state.leaderboards
        .filter(l =>
          !(l.data.category == payload.data.category && l.data.game == payload.data.game)
        ),
        payload];
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
        var gameSearchUrl = `https://www.speedrun.com/api/v1/games?name=${stream.game.name}`;
        return $.ajax({url: gameSearchUrl});
      })
      .then(response => {
        context.commit("SET_GAME_SEARCH_RESULTS", response.data);
        context.commit("SET_STREAM", stream);
        if(context.state.game_search_results.length == 1) {
          context.dispatch("GET_LEADERBOARDS", context.state.game_search_results[0].id);
        }
      })
    },
    GET_LEADERBOARDS(context, payload){
      var game = {};

      GamesApi
      .getById(payload)
      .then(response =>{
        game = response.data;
        return Promise.all(LeaderboardsApi.getLeaderboardPromisesByGame([response.data]));
      })
      .then(response => {
        let leaderboards = response;

        //some leaderboards don't have data
        if(!leaderboards){
          return;
        }

        let gameCategories =
          game.categories.data;

        leaderboards.forEach(l => {
          let category =
            gameCategories.find(c => c.id == l.data.category);

          l.data.name = category.name;
          l.data.runs = RunsApi.mapRunsToView(l.data.runs, l.data.players.data);
        })

        context.commit("SET_GAME", game);
        context.commit("SET_LEADERBOARDS", response);
      })
    },
  }
})
