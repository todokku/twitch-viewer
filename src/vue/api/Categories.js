export default {
  getCategory(category_id){
    const url = `https://www.speedrun.com/api/v1/categories/${category_id}?embed=variables`;
    return fetch(url)
    .then(res => res.json());
  },
}
