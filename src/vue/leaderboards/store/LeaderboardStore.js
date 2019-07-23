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
        console.log(response);
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
        let category =
          flattenedCategories.find( c => c.id == l.data.category);

        if(category){
          category.players = l.data.players.data;
          category.variables = l.data.variables.data;
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
