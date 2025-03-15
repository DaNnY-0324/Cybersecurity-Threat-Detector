import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import {
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { login, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({
        username: formData.username,
        password: formData.password,
      });
    } catch (err) {
      // Error handling is done in AuthContext
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)'
          : 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
        position: 'relative',
      }}
    >
      <Container maxWidth="xs">
        <IconButton
          onClick={() => navigate('/')}
          sx={{
            position: 'absolute',
            top: theme.spacing(2),
            left: theme.spacing(2),
            color: 'white',
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            py: 4,
          }}
        >
          <Card
            sx={{
              width: '100%',
              background: theme.palette.mode === 'dark'
                ? 'rgba(19, 47, 76, 0.9)'
                : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                : '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <LockIcon sx={{ m: 1, fontSize: 40, color: 'primary.main' }} />
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={formData.username}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    height: 48,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)'
                      : 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
                    '&:hover': {
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(45deg, #0d47a1 30%, #1a237e 90%)'
                        : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    },
                  }}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Link
                    to="/register"
                    style={{
                      textDecoration: 'none',
                      color: theme.palette.primary.main,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        transition: 'color 0.2s',
                        '&:hover': {
                          color: theme.palette.primary.light,
                        },
                      }}
                    >
                      Don't have an account? Sign Up
                    </Typography>
                  </Link>
                </Box>
              </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
