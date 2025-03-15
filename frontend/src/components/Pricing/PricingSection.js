import React from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
} from '@mui/material';
import {
  Check,
  Close,
  Security,
  Speed,
  CloudQueue,
  Shield,
  Code,
  Analytics,
  Support,
  Business,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Starter',
    price: '49',
    description: 'Essential security features for small businesses',
    features: [
      'Real-time threat detection',
      'Basic network monitoring',
      'Email security',
      '5 endpoints',
      'Community support',
    ],
    gradient: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)',
    recommended: false,
  },
  {
    name: 'Professional',
    price: '149',
    description: 'Advanced protection for growing organizations',
    features: [
      'All Starter features',
      'Advanced AI detection',
      'Cloud integration',
      '25 endpoints',
      '24/7 priority support',
      'API access',
      'Custom rules',
    ],
    gradient: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large enterprises',
    features: [
      'All Professional features',
      'Unlimited endpoints',
      'Custom integrations',
      'Dedicated support team',
      'On-premise deployment',
      'Compliance reporting',
      'Training & workshops',
    ],
    gradient: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
    recommended: false,
  },
];

const featureMatrix = [
  {
    category: 'Threat Detection',
    icon: <Security />,
    features: [
      {
        name: 'Real-time Monitoring',
        starter: true,
        professional: true,
        enterprise: true,
      },
      {
        name: 'AI-powered Analysis',
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: 'Custom Detection Rules',
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: 'Behavioral Analysis',
        starter: false,
        professional: true,
        enterprise: true,
      },
    ],
  },
  {
    category: 'Performance',
    icon: <Speed />,
    features: [
      {
        name: 'Network Monitoring',
        starter: true,
        professional: true,
        enterprise: true,
      },
      {
        name: 'Resource Optimization',
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: 'Load Balancing',
        starter: false,
        professional: false,
        enterprise: true,
      },
    ],
  },
  {
    category: 'Cloud Security',
    icon: <CloudQueue />,
    features: [
      {
        name: 'Cloud Integration',
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: 'Multi-cloud Support',
        starter: false,
        professional: false,
        enterprise: true,
      },
      {
        name: 'Container Security',
        starter: false,
        professional: true,
        enterprise: true,
      },
    ],
  },
  {
    category: 'API Security',
    icon: <Code />,
    features: [
      {
        name: 'API Monitoring',
        starter: true,
        professional: true,
        enterprise: true,
      },
      {
        name: 'Rate Limiting',
        starter: true,
        professional: true,
        enterprise: true,
      },
      {
        name: 'Custom Rules',
        starter: false,
        professional: true,
        enterprise: true,
      },
    ],
  },
];

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

const PricingSection = () => {
  const theme = useTheme();

  return (
    <Box
      id="pricing"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme => theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 50% 0%, rgba(41, 121, 255, 0.1) 0%, rgba(41, 121, 255, 0.05) 25%, rgba(0, 0, 0, 0) 50%)'
            : 'radial-gradient(circle at 50% 0%, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 25%, transparent 50%)',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              mb: 2,
              fontWeight: 800,
              background: theme => theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #fff 30%, #e0e0e0 90%)'
                : 'linear-gradient(135deg, #1a237e 30%, #0d47a1 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: theme => theme.palette.mode === 'dark'
                ? '0 0 20px rgba(25,118,210,0.3)'
                : '0 0 20px rgba(25,118,210,0.2)',
            }}
          >
            Transparent Pricing
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}
          >
            Choose the plan that best fits your organization's needs
          </Typography>

          {/* Pricing Cards */}
          <Grid container spacing={4} sx={{ mb: 12 }}>
            {plans.map((plan, index) => (
              <Grid item xs={12} md={4} key={plan.name}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      height: '100%',
                      position: 'relative',
                      background: theme => theme.palette.mode === 'dark'
                        ? 'rgba(0, 0, 0, 0.2)'
                        : 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: theme => `1px solid ${
                        theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(255,255,255,0.2)'
                      }`,
                      borderRadius: 4,
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                      ...(plan.recommended && {
                        border: theme => `2px solid ${theme.palette.primary.main}`,
                        boxShadow: theme => `0 8px 32px ${
                          theme.palette.mode === 'dark'
                            ? 'rgba(0,0,0,0.3)'
                            : 'rgba(25,118,210,0.2)'
                        }`,
                      }),
                    }}
                  >
                    {plan.recommended && (
                      <Chip
                        label="Recommended"
                        color="primary"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          fontWeight: 600,
                        }}
                      />
                    )}
                    <Box
                      sx={{
                        background: plan.gradient,
                        py: 4,
                        px: 3,
                        textAlign: 'center',
                        color: 'white',
                      }}
                    >
                      <Typography variant="h5" component="div" fontWeight={700} gutterBottom>
                        {plan.name}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 2 }}>
                        {plan.price !== 'Custom' ? (
                          <>
                            <Typography variant="h3" component="span" fontWeight={800}>
                              ${plan.price}
                            </Typography>
                            <Typography variant="h6" component="span" sx={{ ml: 1 }}>
                              /mo
                            </Typography>
                          </>
                        ) : (
                          <Typography variant="h3" component="span" fontWeight={800}>
                            {plan.price}
                          </Typography>
                        )}
                      </Box>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        {plan.description}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      {plan.features.map((feature, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1.5,
                          }}
                        >
                          <Check
                            sx={{
                              mr: 1,
                              color: 'primary.main',
                              fontSize: 20,
                            }}
                          />
                          <Typography variant="body2">
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 3,
                          py: 1.5,
                          background: plan.gradient,
                          fontWeight: 600,
                          textTransform: 'none',
                          fontSize: '1rem',
                          '&:hover': {
                            background: plan.gradient,
                            filter: 'brightness(110%)',
                          },
                        }}
                      >
                        {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                      </Button>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Feature Matrix */}
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              mb: 6,
              fontWeight: 700,
              background: theme => theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #fff 30%, #e0e0e0 90%)'
                : 'linear-gradient(135deg, #1a237e 30%, #0d47a1 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Feature Comparison
          </Typography>
          <TableContainer
            component={motion.div}
            variants={itemVariants}
            sx={{
              background: theme => theme.palette.mode === 'dark'
                ? 'rgba(0, 0, 0, 0.2)'
                : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              border: theme => `1px solid ${
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(255,255,255,0.2)'
              }`,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Features</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>Starter</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>Professional</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>Enterprise</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {featureMatrix.map((category) => (
                  <React.Fragment key={category.category}>
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        sx={{
                          background: theme => theme.palette.mode === 'dark'
                            ? 'rgba(0, 0, 0, 0.2)'
                            : 'rgba(25, 118, 210, 0.05)',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {category.icon}
                          <Typography variant="subtitle1" fontWeight={600}>
                            {category.category}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                    {category.features.map((feature) => (
                      <TableRow key={feature.name}>
                        <TableCell>{feature.name}</TableCell>
                        <TableCell align="center">
                          {feature.starter ? (
                            <Check color="primary" />
                          ) : (
                            <Close color="disabled" />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {feature.professional ? (
                            <Check color="primary" />
                          ) : (
                            <Close color="disabled" />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {feature.enterprise ? (
                            <Check color="primary" />
                          ) : (
                            <Close color="disabled" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Enterprise Solutions */}
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              mt: 12,
              p: 4,
              borderRadius: 4,
              background: theme => theme.palette.mode === 'dark'
                ? 'rgba(0, 0, 0, 0.2)'
                : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: theme => `1px solid ${
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(255,255,255,0.2)'
              }`,
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h4" gutterBottom fontWeight={700}>
                  Custom Enterprise Solutions
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  Need a tailored solution for your organization? Our enterprise plan offers
                  customizable features, dedicated support, and scalable infrastructure.
                </Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Shield sx={{ mr: 1, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Custom Security Rules
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Tailored security policies and rules
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Analytics sx={{ mr: 1, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Advanced Analytics
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Custom reports and dashboards
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Support sx={{ mr: 1, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Dedicated Support
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          24/7 priority assistance
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Business sx={{ mr: 1, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Compliance & Training
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Custom compliance solutions
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    px: 4,
                    background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                      filter: 'brightness(110%)',
                    },
                  }}
                >
                  Contact Sales Team
                </Button>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                      opacity: 0.1,
                      borderRadius: 4,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="/enterprise-security.svg"
                    alt="Enterprise Security"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      filter: theme => theme.palette.mode === 'dark'
                        ? 'brightness(0.8)'
                        : 'none',
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PricingSection;
