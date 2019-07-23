export default {
  searchSeries(series_query){
    const url = `https://www.speedrun.com/api/v1/series?name=${series_query}`;
    return fetch(url)
    .then(res => res.json());
  }
}
