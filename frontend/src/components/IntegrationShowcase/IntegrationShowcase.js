import React from 'react';
import { Box, Card, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const integrations = {
  cloudProviders: [
    {
      name: 'AWS',
      logo: '/assets/integrations/aws.svg',
      category: 'Cloud Provider',
      description: 'Comprehensive AWS infrastructure monitoring and security',
    },
    {
      name: 'Google Cloud',
      logo: '/assets/integrations/gcp.svg',
      category: 'Cloud Provider',
      description: 'Advanced GCP security and threat detection',
    },
    {
      name: 'Microsoft Azure',
      logo: '/assets/integrations/azure.svg',
      category: 'Cloud Provider',
      description: 'Enterprise-grade Azure cloud security',
    },
    {
      name: 'DigitalOcean',
      logo: '/assets/integrations/digitalocean.svg',
      category: 'Cloud Provider',
      description: 'Simplified cloud infrastructure protection',
    }
  ],
  securityTools: [
    {
      name: 'Splunk',
      logo: '/assets/integrations/splunk.svg',
      category: 'SIEM',
      description: 'Real-time security information and event management',
    },
    {
      name: 'IBM QRadar',
      logo: '/assets/integrations/qradar.svg',
      category: 'SIEM',
      description: 'Intelligent security analytics and monitoring',
    },
    {
      name: 'Elastic Security',
      logo: '/assets/integrations/elastic.svg',
      category: 'Security Analytics',
      description: 'Unified security analytics and threat detection',
    },
    {
      name: 'Palo Alto Networks',
      logo: '/assets/integrations/paloalto.svg',
      category: 'Network Security',
      description: 'Next-generation firewall and threat prevention',
    }
  ],
  complianceTools: [
    {
      name: 'Qualys',
      logo: '/assets/integrations/qualys.svg',
      category: 'Compliance',
      description: 'Continuous security and compliance monitoring',
    },
    {
      name: 'Rapid7',
      logo: '/assets/integrations/rapid7.svg',
      category: 'Vulnerability Management',
      description: 'Advanced vulnerability assessment and management',
    },
    {
      name: 'Tenable',
      logo: '/assets/integrations/tenable.svg',
      category: 'Security Assessment',
      description: 'Comprehensive vulnerability management platform',
    },
    {
      name: 'CrowdStrike',
      logo: '/assets/integrations/crowdstrike.svg',
      category: 'Endpoint Security',
      description: 'AI-powered endpoint protection and response',
    }
  ]
};

const IntegrationCard = ({ integration }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
    >
      <Card
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(255,255,255,0.03)' 
            : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          border: `1px solid ${theme.palette.mode === 'dark' 
            ? 'rgba(255,255,255,0.1)' 
            : 'rgba(0,0,0,0.05)'}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255,255,255,0.07)' 
              : 'rgba(255,255,255,1)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(0,0,0,0.3)'
              : '0 8px 32px rgba(25,118,210,0.12)',
            '&::before': {
              transform: 'translateX(0)'
            }
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}11)`,
            transform: 'translateX(-100%)',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }
        }}
      >
        <Box
          component="img"
          src={integration.logo}
          alt={integration.name}
          sx={{
            width: 64,
            height: 64,
            mb: 2,
            filter: theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)'
            }
          }}
        />
        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            fontWeight: 600,
            mb: 1,
            fontFamily: 'Inter, sans-serif',
            background: theme => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #fff 30%, #e0e0e0 90%)'
              : 'linear-gradient(135deg, #1a237e 30%, #0d47a1 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: theme.palette.mode === 'dark' ? 'transparent' : 'inherit',
          }}
        >
          {integration.name}
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: 'text.secondary',
            mb: 1,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {integration.category}
        </Typography>
        <Typography
          variant="caption"
          align="center"
          sx={{
            color: 'text.secondary',
            opacity: 0.8,
            px: 2,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {integration.description}
        </Typography>
      </Card>
    </motion.div>
  );
};

const IntegrationGroup = ({ title, integrations }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mb: 8 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 4,
          fontWeight: 600,
          position: 'relative',
          display: 'inline-block',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: 60,
            height: 3,
            borderRadius: 1.5,
            backgroundColor: theme.palette.primary.main,
            opacity: 0.7
          }
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr 1fr'
          },
          gap: { xs: 2, sm: 3, md: 4 },
          mt: 4
        }}
      >
        {integrations.map((integration, index) => (
          <motion.div
            key={integration.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <IntegrationCard integration={integration} />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

const IntegrationShowcase = () => {
  const theme = useTheme();

  return (
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
          background: theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 50% 50%, rgba(25,118,210,0.05) 0%, transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(25,118,210,0.03) 0%, transparent 70%)',
          zIndex: -1
        }
      }}
    >
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: 3,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #fff 30%, #e0e0e0 90%)'
                : 'linear-gradient(135deg, #1a237e 30%, #0d47a1 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: theme.palette.mode === 'dark' ? 'transparent' : 'inherit',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Powerful Integrations
          </Typography>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              mb: 8,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              lineHeight: 1.6,
              opacity: 0.9,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Connect with leading security platforms and tools
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <IntegrationGroup
            title="Cloud Service Providers"
            integrations={integrations.cloudProviders}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <IntegrationGroup
            title="Security & SIEM Systems"
            integrations={integrations.securityTools}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <IntegrationGroup
            title="Compliance & Security Tools"
            integrations={integrations.complianceTools}
          />
        </motion.div>
      </Box>
    </Box>
  );
};

export default IntegrationShowcase;
