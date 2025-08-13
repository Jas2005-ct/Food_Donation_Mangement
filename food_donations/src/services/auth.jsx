// src/services/auth.js
export const setAuthTokens = ({ access, refresh, user }) => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  localStorage.setItem('user', JSON.stringify(user));
  
  // Set default auth header for axios
  axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
};

export const getAuthTokens = () => {
  const access = localStorage.getItem('access_token');
  const refresh = localStorage.getItem('refresh_token');
  const user = JSON.parse(localStorage.getItem('user'));
  
  return { access, refresh, user };
};

export const clearAuthTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('access_token');
};