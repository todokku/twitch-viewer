import Vue from 'vue'
import Vuex from 'vuex'
import GamesApi from '../../api/Games.js'
import RunsApi from '../../api/Runs.js'
import Utils from './utils.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    game_search_results: [],
    runs: [],
    game_variables: []
  },
  mutations: {
    SET_GAME_SEARCH_RESULTS(state, value) {
      state.game_search_results = value;
    },
    SET_RUNS(state, value) {
      state.runs = value;
    },
    SET_GAME_VARIABLES(state, value) {
      state.game_variables = value;
    }
  },
  actions: {
    SEARCH_GAMES(context, payload){
      GamesApi
      .getByGameName(payload)
      .then(response => {
        context.commit("SET_GAME_SEARCH_RESULTS", response.data);
      })
    },
    GET_RUNS(context, payload){
      var gamePromise = GamesApi
        .getById(payload);

      var runsPromise = RunsApi
        .runPromise(payload);

      Promise.all([gamePromise, runsPromise])
      .then((values) => {
        let gameVariables = values[0].data;
        let runs = values[1];

        //set game variables
        //set selectedValue to default variable
        gameVariables
        .filter(v =>
          v.category || v["is-subcategory"] == true //some variables are game global
        )
        .forEach(v => {
          let defaultVariableString = v.values.default;
          v.values.values[defaultVariableString].selected = true;
        })
        context.commit("SET_GAME_VARIABLES", gameVariables);

        //group the runs by category
        const grouped = Utils.groupBy(runs, run => run.category.data.name);
        const groupedRuns = Array.from(grouped);

        context.commit("SET_RUNS", groupedRuns);
      })
    },
    UPDATE_GAME_VARIABLES(context, payload) {
      let game_variables = context.state.game_variables;

      let variable = game_variables.find(v => v.id == payload.id);

      let values = variable.values.values;
      let keys = Object.keys(values);
      keys.forEach(k => {
        values[k].selected = false;
      })
      values[payload.value].selected = true;
    }
  },
})
