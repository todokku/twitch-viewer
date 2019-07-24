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
          var categoryVariable = g
            .variables.data
            .find(v =>
              v.category == c.id ||
              (v.category == null && v["is-subcategory"] == true) //some variables are game global
            );

          if(categoryVariable) {
            var defaultVariable = {
              id: categoryVariable.id,
              value: categoryVariable.values.default
            };

            leaderboardPromises.push (
              this.getLeaderboard(g.id, c.id, defaultVariable)
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
  getLeaderboard(game, category, variable){
    let url = `https://www.speedrun.com/api/v1/leaderboards/${game}/category/${category}?embed=players,variables`;

    if(variable) {
      url +=`&var-${variable.id}=${variable.value}`;
    }

    return fetch(url)
    .then(res => res.json());
  },
}
