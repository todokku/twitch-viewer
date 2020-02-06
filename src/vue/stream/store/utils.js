import RunsApi from '../../api/Runs.js'

export default {
  transformLeaderboard(leaderboard, categories) {
    let category =
      categories
      .find(c => c.id == leaderboard.data.category);

    leaderboard.data.name = category.name;
    leaderboard.data.runs = RunsApi.mapRunsToView(leaderboard.data.runs, leaderboard.data.players.data);

    return leaderboard;
  },
}
