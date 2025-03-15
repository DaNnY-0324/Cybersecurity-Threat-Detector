import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import { Menu as MenuIcon, Security } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Resources', href: '#resources' },
  { label: 'Pricing', href: '#pricing' },
];

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    handleMenuClose();
  };

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: isScrolled
            ? theme.palette.mode === 'dark'
              ? 'rgba(0, 0, 0, 0.8)'
              : 'rgba(255, 255, 255, 0.8)'
            : 'transparent',
          backdropFilter: 'blur(10px)',
          borderBottom: isScrolled ? 1 : 0,
          borderColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              minHeight: { xs: 64, md: 72 },
              py: 1,
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/')}
              >
                <Security
                  sx={{
                    fontSize: 32,
                    mr: 1,
                    color: theme => theme.palette.mode === 'dark'
                      ? 'primary.light'
                      : 'primary.main'
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    background: theme => theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #fff 30%, #e0e0e0 90%)'
                      : 'linear-gradient(135deg, #1a237e 30%, #0d47a1 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  CyberGuard
                </Typography>
              </Box>
            </motion.div>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                edge="end"
                onClick={handleMenuOpen}
                sx={{
                  color: theme => theme.palette.mode === 'dark'
                    ? 'white'
                    : 'primary.main'
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{
                  '& .MuiPaper-root': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(0, 0, 0, 0.9)'
                      : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    border: theme => `1px solid ${
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)'
                    }`,
                  }
                }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      py: 1.5,
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate('/login');
                  }}
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    color: 'primary.main',
                    py: 1.5,
                  }}
                >
                  Sign In
                </MenuItem>
              </Menu>
            </Box>

            {/* Desktop Menu */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 3
              }}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    onClick={() => scrollToSection(item.href)}
                    sx={{
                      color: theme => theme.palette.mode === 'dark'
                        ? 'white'
                        : 'text.primary',
                      fontWeight: 500,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontFamily: 'Inter, sans-serif',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: 'primary.main',
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                  variant="contained"
                  onClick={() => navigate('/login')}
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    background: theme => theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #1a237e 30%, #0d47a1 90%)'
                      : 'linear-gradient(135deg, #42a5f5 30%, #1976d2 90%)',
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      transform: 'translateY(-1px)',
                    }
                  }}
                >
                  Sign In
                </Button>
              </motion.div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;
