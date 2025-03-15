import React, { useState, useEffect, Suspense } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ExitToApp as LogoutIcon } from '@mui/icons-material';
import { useNotification } from '../../context/NotificationContext';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  NotificationsActive,
  NetworkCheck,
  DarkMode,
  LightMode,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useTransition } from '../../context/TransitionContext';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageTransitions } from '../../utils/animations';
import { useTheme } from '../../context/ThemeContext';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Alerts', icon: <NotificationsActive />, path: '/dashboard/alerts' },
  { text: 'Network Traffic', icon: <NetworkCheck />, path: '/dashboard/network-traffic' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings' },
];

// Direct links to dashboard pages - bypassing React Router for reliability
const directLinks = {
  '/dashboard': '/dashboard',
  '/dashboard/alerts': '/dashboard/alerts',
  '/dashboard/network-traffic': '/dashboard/network-traffic',
  '/dashboard/settings': '/dashboard/settings',
};

const getPathMatch = (pathname) => {
  // Handle root dashboard path
  if (pathname === '/dashboard' || pathname === '/dashboard/') return '/dashboard';
  
  // Handle nested paths by matching to their menu item
  for (const item of menuItems) {
    if (pathname.startsWith(item.path)) {
      return item.path;
    }
  }
  
  return pathname;
};

const getActiveItem = (pathname) => {
  const path = getPathMatch(pathname);
  const item = menuItems.find(item => item.path === path);
  return item ? item.text : 'Dashboard';
};

const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      bgcolor: theme => theme.palette.mode === 'dark' 
        ? 'rgba(0, 0, 0, 0.3)' 
        : 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
    }}
  >
    <CircularProgress />
  </Box>
);

const Layout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { logout } = useAuth();
  const { showNotification } = useNotification();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const activeItem = getActiveItem(location.pathname);
  
  // Debug current location
  useEffect(() => {
    console.log('Current location:', location.pathname);
  }, [location.pathname]);

  // Handle authentication only
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      setIsNavigating(true);
      await logout();
      showNotification('Successfully logged out', 'success');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      showNotification('Failed to logout. Please try again.', 'error');
    } finally {
      setIsNavigating(false);
    }
  };

  const { setIsTransitioning } = useTransition();
  const transitions = usePageTransitions();

  const handleNavigation = (path) => {
    try {
      // Set states for transition effects
      setIsNavigating(true);
      setIsTransitioning(true);
      
      // Debug log
      console.log('Navigating to:', path);
      
      // Use React Router navigation
      navigate(path);
      
      // Close mobile drawer if needed
      if (isMobile) handleDrawerToggle();
      
      // Reset transition state after a delay
      setTimeout(() => {
        setIsNavigating(false);
        setIsTransitioning(false);
      }, 300);
    } catch (error) {
      console.error('Navigation failed:', error);
      showNotification('Failed to navigate. Please try again.', 'error');
      setIsNavigating(false);
      setIsTransitioning(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderDrawerContent = () => (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <motion.div
            key={item.text}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.3, ease: 'easeOut' }
              }
            }}
          >
            <ListItemButton
              onClick={() => window.location.href = directLinks[item.path]}
              selected={getPathMatch(location.pathname) === item.path}
              sx={{
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
                transition: 'all 0.2s ease-in-out',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '4px',
                  height: '100%',
                  bgcolor: 'primary.main',
                  transform: 'translateX(-4px)',
                  transition: 'transform 0.2s ease-in-out',
                },
                '&:hover': {
                  bgcolor: theme =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.04)',
                  '&::before': {
                    transform: 'translateX(0)',
                  },
                },
                '&.Mui-selected': {
                  bgcolor: theme =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(33, 150, 243, 0.15)'
                      : 'rgba(33, 150, 243, 0.1)',
                  '&:hover': {
                    bgcolor: theme =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(33, 150, 243, 0.2)'
                        : 'rgba(33, 150, 243, 0.15)',
                  },
                  '&::before': {
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: getPathMatch(location.pathname) === item.path ? 'primary.main' : 'inherit',
                  transition: 'color 0.2s ease-in-out',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: getPathMatch(location.pathname) === item.path ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          </motion.div>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <Typography variant="h6" noWrap component="div">
              Cybersecurity Threat Detector
            </Typography>
            {activeItem && (
              <Typography
                variant="subtitle1"
                noWrap
                sx={{
                  opacity: 0.7,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                / {activeItem}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              <IconButton
                color="inherit"
                onClick={toggleDarkMode}
                sx={{
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'rotate(180deg)' },
                }}
              >
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton
                color="inherit"
                onClick={handleLogout}
                sx={{
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.1)' },
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: theme => 
                `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
              background: theme =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(180deg, rgba(19, 47, 76, 0.9) 0%, rgba(10, 25, 41, 0.9) 100%)'
                  : 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 245, 245, 0.9) 100%)',
              backdropFilter: 'blur(10px)',
              ...transitions.card.style,
            },
          }}
        >
          {renderDrawerContent()}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, sm: 8 },
          minHeight: '100vh',
          overflow: 'hidden',
          bgcolor: theme => theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            {...transitions.card}
            style={{
              flex: 1,
              overflow: 'auto',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              style={{
                height: '100%',
                width: '100%',
                padding: '1rem',
                background: theme => theme.palette.mode === 'dark'
                  ? 'linear-gradient(180deg, rgba(19, 47, 76, 0.5) 0%, rgba(10, 25, 41, 0.5) 100%)'
                  : 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 245, 245, 0.9) 100%)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                boxShadow: theme => theme.palette.mode === 'dark'
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Suspense fallback={<LoadingFallback />}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ height: '100%' }}
                >
                  <Outlet />
                </motion.div>
              </Suspense>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Layout;
