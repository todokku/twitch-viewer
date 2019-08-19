export default {
  getBySeriesId(series_id){
    const url = `https://www.speedrun.com/api/v1/series/${series_id}/games?embed=categories,variables`;
    return fetch(url)
    .then(res => res.json());
  },
  getByGameName(game_name){
    const url = `https://www.speedrun.com/api/v1/games?name=${game_name}`;
    return fetch(url)
    .then(res => res.json());
  },
  getById(game_id){
    const url = `https://www.speedrun.com/api/v1/games/${game_id}/variables`;
    return fetch(url)
    .then(res => res.json());
  },
  mapGamesToView(games){
    return games.map(g => {
      return {
        id: g.id,
        name: g.names.international,
        releaseDate: g["release-date"],
        categories: g.categories.data.filter(c => c.type == "per-game").map(c => {
          return {
            id: c.id,
            name: c.name
          }
        })
      }
    });
  }
}
