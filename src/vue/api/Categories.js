export default {
  getCategory(category_id){
    const url = `https://www.speedrun.com/api/v1/categories/${category_id}?embed=variables`;
    return fetch(url)
    .then(res => res.json());
  },
  getDefaultVariable(category){
    if(category.variables.length > 0){
      let variableId = variables[0].id;
      let defaultValue = variables[0].values.default;

      return {
        id: variableId,
        value: defaultValue
      }
    }
  }
}
