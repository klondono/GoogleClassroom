const currentUser = JSON.parse(localStorage.getItem('user_session'));
const initialState = currentUser
  ? { loggedIn: true, user: currentUser }
  : { loggedIn: false, user: null };

export const user = {
  namespaced: true,
  state: initialState,
  mutations: {
    loginSuccess(state, user) {
      state.loggedIn = true;
      state.user = user;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = null;
    }
  }
};