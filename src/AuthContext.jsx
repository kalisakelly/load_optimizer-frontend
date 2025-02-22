import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';


export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User object or null if not logged in
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Token stored in localStorage

  useEffect(() => {
    if (token) {
      fetch('http://localhost:3000/auth/user', { // Replace with your API endpoint to get user details
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data); // Set user data including roles
        })
        .catch((err) => console.error(err));
    }
  }, [token]);

  const login = (userData, token) => {
    console.log('Storing token:', token); // Debugging
    Cookies.set('jwt', token, { secure: true, sameSite: 'strict' }); // Store token in HTTP-only cookie
    setToken(token);
    setUser(userData);
  };

 const logout = () => {
  Cookies.remove('jwt'); // Remove token from HTTP-only cookie
  setToken(null);
  setUser(null);
};

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};