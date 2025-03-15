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
  PersonAdd as PersonAddIcon,
  Visibility,
  VisibilityOff,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { register, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate('/login');
    } catch (err) {
      // Error handling is done in AuthContext
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
                <PersonAddIcon sx={{ m: 1, fontSize: 40, color: 'primary.main' }} />
                <Typography component="h1" variant="h5">
                  Register
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  value={formData.email}
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
                  autoComplete="new-password"
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleToggleConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                  {isLoading ? 'Registering...' : 'Register'}
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
                    to="/login"
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
                      Already have an account? Sign In
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

export default Register;
