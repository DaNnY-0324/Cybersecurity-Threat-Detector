import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CircularProgress } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Import components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Import custom providers
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { TransitionProvider } from './context/TransitionContext';

// Lazy load pages for better performance
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Alerts = lazy(() => import('./pages/Alerts'));
const NetworkTraffic = lazy(() => import('./pages/NetworkTraffic'));
const Settings = lazy(() => import('./pages/Settings'));

// Dashboard Routes Component
const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="network-traffic" element={<NetworkTraffic />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

function AppContent() {
  const { darkMode } = useTheme();
  
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            light: darkMode ? '#4dabf5' : '#64b5f6',
            main: darkMode ? '#2196f3' : '#2196f3',
            dark: darkMode ? '#1769aa' : '#1976d2',
            contrastText: '#fff',
          },
          secondary: {
            light: darkMode ? '#f73378' : '#ff4081',
            main: darkMode ? '#f50057' : '#f50057',
            dark: darkMode ? '#ab003c' : '#c51162',
            contrastText: '#fff',
          },
          background: darkMode ? {
            default: '#0a1929',
            paper: '#132f4c',
            card: 'rgba(19, 47, 76, 0.9)',
          } : {
            default: '#f5f5f5',
            paper: '#ffffff',
            card: 'rgba(255, 255, 255, 0.9)',
          },
          text: darkMode ? {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
          } : {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            letterSpacing: '-0.01562em',
          },
          h2: {
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.00833em',
          },
          h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            letterSpacing: '0em',
          },
          h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            letterSpacing: '0.00735em',
          },
          h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            letterSpacing: '0em',
          },
          h6: {
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.0075em',
          },
          button: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
        },
        components: {
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: darkMode ? '#0a1929' : '#ffffff',
                borderRight: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: darkMode
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
              },
            },
          },
        },
      }),
    [darkMode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Suspense
          fallback={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                bgcolor: theme => theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <DashboardRoutes />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Router>
          <TransitionProvider>
            <AppContent />
          </TransitionProvider>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
