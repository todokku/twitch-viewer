export default {
  getBySeriesId(series_id){
    const url = `https://www.speedrun.com/api/v1/series/${series_id}/games?embed=categories,variables`;
    return fetch(url)
    .then(res => res.json());
  }
}
