import CategoriesApi from './Categories.js'

export default {
  getLeaderboardPromisesByGame(games) {
    let leaderboardPromises = [];

    games.forEach((g) => {
      g.categories.data
        .filter(c => c.type == "per-game")
        .forEach((c) => {

        //if a category has variables, get the board with the default value
        if(g.variables.data.length > 0) {
          var categoryVariables = g
            .variables.data
            .filter(v =>
              v.category == c.id ||
              (v.category == null && v["is-subcategory"] == true) //some variables are game global
            );

          if(categoryVariables) {
            var defaultVariables = [];

            categoryVariables.forEach(v => {
              var value = v.values.default;
              if(!value) { //some variables do not have default values
                value = Object.keys(v.values.values)[0];
              }
              var variable = {
                id: v.id,
                value: value
              }

              defaultVariables.push(variable);
            });

            leaderboardPromises.push (
              this.getLeaderboard(g.id, c.id, defaultVariables)
            )
          }
          else {
            leaderboardPromises.push (
              this.getLeaderboard(g.id, c.id, null)
            )
          }
        }
        else {
          leaderboardPromises.push (
            this.getLeaderboard(g.id, c.id, null)
          )
        }
      })
    })

    return leaderboardPromises;
  },
  getLeaderboard(game, category, variables){
    let url = `https://www.speedrun.com/api/v1/leaderboards/${game}/category/${category}?embed=players,variables`;

    if(variables) {
      variables.forEach(v => {
        url +=`&var-${v.id}=${v.value}`;
      })
    }

    return fetch(url)
    .then(res => res.json());
  },
}
