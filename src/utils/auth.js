import jwtDecode from "jwt-decode";

export const getUser = () => {
  const token = localStorage.getItem("token");
  return token ? jwtDecode(token) : null;
};

export const isAuthenticated = () => !!localStorage.getItem("token");
