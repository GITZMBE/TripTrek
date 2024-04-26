

export const logout = () => {
  sessionStorage.removeItem('loggedInUser');
};

export default logout;