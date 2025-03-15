import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './NotificationContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (token && process.env.NODE_ENV === 'development') {
      // Development mode - restore mock user
      const user = storedUser ? JSON.parse(storedUser) : { token, username: 'dev-user' };
      setUser(user);
    } else if (token) {
      // Production mode - verify token with backend
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Development mode - mock authentication
      if (process.env.NODE_ENV === 'development') {
        const devToken = 'dev-token-123';
        const devUser = { token: devToken, username: 'dev-user' };
        localStorage.setItem('authToken', devToken);
        localStorage.setItem('user', JSON.stringify(devUser));
        setUser(devUser);
        showNotification('Development mode: Logged in successfully', 'success');
        navigate('/dashboard');
        return;
      }

      // Production mode - real authentication
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      setUser(data);
      showNotification('Successfully logged in', 'success');
      navigate('/dashboard');
    } catch (error) {
      showNotification(error.message, 'error');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    showNotification('Successfully logged out', 'success');
    navigate('/');
  };

  const register = async (userData) => {
    try {
      // In a real app, make API call to backend
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      showNotification('Registration successful! Please log in.', 'success');
      navigate('/login');
    } catch (error) {
      showNotification(error.message, 'error');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
