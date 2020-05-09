export const state = Router => ({
  isAuthenticated: localStorage.token?localStorage.token:""
});
export const getters = {
  getIsAuthenticated(state) {
    console.log(localStorage.token);
    return state.isAuthenticated;
  }
};
export const mutations = {
  disconnect(state) {
    localStorage.token = "";
    location.reload();
    state.isAuthenticated = localStorage.token;
  }
};
