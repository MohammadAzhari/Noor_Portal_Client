const storage = {
  getToken() {
    return localStorage.getItem('user_token');
  },
  setToken(token) {
    localStorage.setItem('user_token', token);
  },
  isThereToken() {
    return Boolean(this.getToken());
  },
  removeToken() {
    localStorage.removeItem('user_token');
  },
};

export default storage;
