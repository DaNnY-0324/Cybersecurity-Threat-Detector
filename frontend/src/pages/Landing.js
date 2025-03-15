import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Paper,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Security,
  Speed,
  Visibility,
  Shield,
  CheckCircle,
  Timeline,
  CloudQueue,
  Code,
  NotificationsActive,
  NetworkCheck,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SecurityDemo from '../components/SecurityDemo/SecurityDemo';
import IntegrationShowcase from '../components/IntegrationShowcase/IntegrationShowcase';
import SecurityResourcesHub from '../components/SecurityResources/SecurityResourcesHub';
import Navbar from '../components/Navigation/Navbar';
import CyberShieldAnimation from '../components/Hero/CyberShieldAnimation';
import PricingSection from '../components/Pricing/PricingSection';



const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const features = [
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: 'Advanced Threat Detection',
    description: 'Real-time monitoring and AI-powered threat detection to keep your systems secure.',
  },
  {
    icon: <Speed sx={{ fontSize: 40 }} />,
    title: 'Real-time Analytics',
    description: 'Instant insights into network traffic and potential security threats.',
  },
  {
    icon: <Visibility sx={{ fontSize: 40 }} />,
    title: 'Complete Visibility',
    description: 'Comprehensive dashboard with detailed metrics and visualization.',
  },
  {
    icon: <Shield sx={{ fontSize: 40 }} />,
    title: 'Proactive Protection',
    description: 'Stay ahead of threats with predictive analysis and automated responses.',
  },
];

const benefits = [
  {
    icon: <Timeline />,
    title: 'Advanced Analytics',
    points: [
      'Machine learning-powered threat detection',
      'Behavioral analysis and anomaly detection',
      'Predictive security insights',
    ],
  },
  {
    icon: <CloudQueue />,
    title: 'Cloud Integration',
    points: [
      'Seamless cloud infrastructure monitoring',
      'Multi-cloud environment support',
      'Real-time cloud security posture',
    ],
  },
  {
    icon: <Code />,
    title: 'API Security',
    points: [
      'Comprehensive API vulnerability scanning',
      'OAuth and JWT token protection',
      'Rate limiting and DDoS prevention',
    ],
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CISO',
    company: 'TechCorp',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: 'This platform has transformed our security operations. The real-time threat detection and response capabilities are outstanding.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Security Engineer',
    company: 'DataSafe Solutions',
    avatar: 'https://i.pravatar.cc/150?img=2',
    content: 'The machine learning capabilities have helped us identify threats we would have missed. It\'s like having an extra team member.',
  },
  {
    name: 'Emily Thompson',
    role: 'IT Director',
    company: 'FinanceGuard',
    avatar: 'https://i.pravatar.cc/150?img=3',
    content: 'Implementing this solution reduced our incident response time by 60%. The ROI has been incredible.',
  },
];

const Landing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Navbar />
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          background: theme => `linear-gradient(135deg, 
            ${theme.palette.mode === 'dark' ? '#1a237e' : '#42a5f5'} 0%, 
            ${theme.palette.mode === 'dark' ? '#0d47a1' : '#1976d2'} 50%,
            ${theme.palette.mode === 'dark' ? '#283593' : '#2196f3'} 100%)`,
          color: 'white',
          minHeight: { xs: '90vh', md: '85vh' },
          pt: { xs: 8, md: 10 },
          pb: { xs: 6, md: 8 },
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme => theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at 20% 20%, rgba(41, 121, 255, 0.1) 0%, rgba(41, 121, 255, 0.05) 25%, rgba(0, 0, 0, 0) 50%)'
              : 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0) 50%)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Typography
                  variant={isMobile ? 'h3' : 'h1'}
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                    textShadow: theme => theme.palette.mode === 'dark'
                      ? '0 0 20px rgba(25,118,210,0.3), 0 2px 4px rgba(0,0,0,0.2)'
                      : '0 0 20px rgba(25,118,210,0.2), 0 2px 4px rgba(0,0,0,0.1)',
                    mb: 3,
                    background: theme => theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #fff 30%, #e0e0e0 90%)'
                      : 'linear-gradient(135deg, #1a237e 30%, #0d47a1 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                  }}
                >
                  AI-Enhanced Cybersecurity Threat Detection
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    maxWidth: 600,
                    lineHeight: 1.6,
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    color: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.9)' : 'white',
                  }}
                >
                  Protect your infrastructure with advanced machine learning and real-time monitoring.
                </Typography>
                <Box
                  sx={{
                    '& button': {
                      mr: 2,
                      mb: 2,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'none',
                      transition: 'all 0.3s ease-in-out',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                      },
                    }
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      background: theme => `linear-gradient(135deg, 
                        ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : theme.palette.primary.main} 0%,
                        ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : theme.palette.primary.dark} 100%)`,
                      color: 'white',
                      backdropFilter: 'blur(10px)',
                      border: theme => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      padding: '12px 32px',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme => `0 8px 20px ${theme.palette.mode === 'dark' 
                          ? 'rgba(0,0,0,0.3)' 
                          : 'rgba(25,118,210,0.3)'}`,
                        background: theme => `linear-gradient(135deg, 
                          ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : theme.palette.primary.dark} 0%,
                          ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.25)' : theme.palette.primary.main} 100%)`,
                      },
                    }}
                  >
                    Get Started
                  </Button>

              </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }, position: 'relative' }}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ height: '100%', minHeight: 400 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: theme => theme.palette.mode === 'dark'
                      ? 'rgba(0, 0, 0, 0.2)'
                      : 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: theme => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)'}`,
                    boxShadow: theme => theme.palette.mode === 'dark'
                      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                      : '0 8px 32px rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <CyberShieldAnimation />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Interactive Security Demo */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            background: theme => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #1a237e 30%, #0d47a1 90%)'
              : 'linear-gradient(135deg, #42a5f5 30%, #1976d2 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          See Our Platform in Action
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 4, color: 'text.secondary' }}
        >
          Watch our AI-powered threat detection system identify and neutralize security threats in real-time
        </Typography>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SecurityDemo />
        </motion.div>
      </Container>

      {/* Integration Ecosystem */}
      <Box id="integrations" sx={{
        py: 8,
        bgcolor: theme => theme.palette.mode === 'dark'
          ? 'rgba(0,0,0,0.2)'
          : 'rgba(255,255,255,0.1)',
        borderTop: 1,
        borderBottom: 1,
        borderColor: theme => theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,0.1)'
          : 'rgba(0,0,0,0.1)'
      }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              mb: 2,
              background: theme => theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #1a237e 30%, #0d47a1 90%)'
                : 'linear-gradient(135deg, #42a5f5 30%, #1976d2 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            Seamless Integration Ecosystem
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ mb: 6, color: 'text.secondary', maxWidth: 800, mx: 'auto' }}
          >
            Our platform integrates with leading cloud providers, security tools, and SIEM systems to provide comprehensive protection for your infrastructure
          </Typography>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <IntegrationShowcase />
          </motion.div>
        </Container>
      </Box>

      {/* Core Security Features */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="features">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            background: theme => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #1a237e 30%, #0d47a1 90%)'
              : 'linear-gradient(135deg, #42a5f5 30%, #1976d2 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          Proactive Defense System
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    align="center"
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Advanced Intelligence Section */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              mb: 6,
              background: theme => theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #0d47a1 30%, #1a237e 90%)'
                : 'linear-gradient(135deg, #1976d2 30%, #42a5f5 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            Advanced Threat Intelligence
          </Typography>
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      backgroundColor: 'background.paper',
                      borderRadius: 2,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          width: 56,
                          height: 56,
                          mr: 2,
                        }}
                      >
                        {benefit.icon}
                      </Avatar>
                      <Typography variant="h6" component="h3">
                        {benefit.title}
                      </Typography>
                    </Box>
                    <List>
                      {benefit.points.map((point, idx) => (
                        <ListItem key={idx} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircle color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={point} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <PricingSection />

      {/* Security Resources Hub */}
      <Box id="resources"
        sx={{
          position: 'relative',
          bgcolor: theme => theme.palette.mode === 'dark'
            ? 'rgba(0,0,0,0.2)'
            : 'rgba(25,118,210,0.02)',
          borderTop: 1,
          borderBottom: 1,
          borderColor: theme => theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(0,0,0,0.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme => theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at 50% 50%, rgba(25,118,210,0.05) 0%, transparent 70%)'
              : 'radial-gradient(circle at 50% 50%, rgba(25,118,210,0.03) 0%, transparent 70%)',
            zIndex: 0,
          }
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SecurityResourcesHub />
        </motion.div>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to secure your network?
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Join thousands of organizations that trust our platform for their cybersecurity needs.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                mt: 2,
                background: theme => theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #1a237e 30%, #0d47a1 90%)'
                  : 'linear-gradient(135deg, #42a5f5 30%, #1976d2 90%)',
                color: 'white',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                },
              }}
            >
              Start Free Trial
            </Button>
          </motion.div>
        </Container>
      </Box>

    </Box>
  );
};

export default Landing;
