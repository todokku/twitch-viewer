import Vue from 'vue'
import Vuex from 'vuex'
import GamesApi from '../../api/Games.js'
import LeaderboardsApi from '../../api/Leaderboards.js'
import RunsApi from '../../api/Runs.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    games: [],
    leaderboards: []
  },
  mutations: {
    SET_GAMES(state, value){
      state.games = value;
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

      //get all of the leaderboards except the one to be updated
      var newLeaderboards = state.leaderboards
        .filter(l =>
          !(l.data.category == payload.data.category && l.data.game == payload.data.game)
        );

      newLeaderboards.push(payload);
      state.leaderboards = newLeaderboards;
    }
  },
  actions: {
    GET_LEADERBOARDS(context, payload){
      GamesApi
      .getBySeriesId(payload)
      .then(response => {
        context.commit("SET_GAMES", response.data);
      })
      .then(() =>{
        return Promise.all(LeaderboardsApi.getLeaderboardPromisesByGame(context.state.games));
      })
      .then(response => {
        context.commit("SET_LEADERBOARDS", response);
      })
    }
  },
  getters: {
    view(state, getters) {
      let games = GamesApi.mapGamesToView(state.games);

      let flattenedCategories =
        games
        .map(g => g.categories)
        .flat();

      //add leaderboards to category
      state.leaderboards.forEach(l => {
        //some leaderboards don't have data
        if(!l.data){
          return;
        }

        let category =
          flattenedCategories.find( c => c.id == l.data.category);

        //only add subcategory variables
        let variables =
          l.data.variables.data.filter(v =>
            v["is-subcategory"] == true
          );

        if(category && l.data){
          category.gameId = l.data.game;
          category.players = l.data.players.data;
          category.variables = variables;
          category.values = l.data.values;
          category.runs = RunsApi.mapRunsToView(l.data.runs, category.players);
        }
      })

      games = games.sort((a,b) => {
        var dateA = new Date(a.releaseDate);
        var dateB = new Date(b.releaseDate);
        return dateA - dateB;
      });

      //sort games by release date
      return games;
    }
  }
})
