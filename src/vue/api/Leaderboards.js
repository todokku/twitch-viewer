export default {
  getLeaderboardPromises(games) {
    let leaderboardPromises = [];

    games.forEach((g) => {
      g.categories.data
        .filter(c => c.type == "per-game")
        .forEach((c) => {
        leaderboardPromises.push (
          this.getLeaderboard(g.id, c.id)
        )
      })
    })

    return leaderboardPromises;
  },

  getLeaderboard(game, category){
    let url = `https://www.speedrun.com/api/v1/leaderboards/${game}/category/${category}?embed=players,variables`;
    return fetch(url)
    .then(res => res.json());
  },
}
