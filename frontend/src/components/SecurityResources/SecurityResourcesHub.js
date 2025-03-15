import React from 'react';
import { Box, Card, Container, Grid, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';

const resources = [
  {
    title: 'Latest Security News',
    description: 'Stay informed with real-time cybersecurity news and threat alerts',
    icon: RssFeedIcon,
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    delay: 0
  },
  {
    title: 'Best Practices',
    description: 'Expert insights and guidelines for enhancing your security posture',
    icon: LightbulbIcon,
    gradient: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
    delay: 0.1
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step guides for implementing security measures',
    icon: PlayCircleIcon,
    gradient: 'linear-gradient(135deg, #2196F3 0%, #1565C0 100%)',
    delay: 0.2
  },
  {
    title: 'White Papers',
    description: 'In-depth research and analysis of security trends and solutions',
    icon: ArticleIcon,
    gradient: 'linear-gradient(135deg, #9C27B0 0%, #6A1B9A 100%)',
    delay: 0.3
  }
];

const ResourceCard = ({ resource }) => {
  const theme = useTheme();
  const { title, description, icon: Icon, gradient, delay } = resource;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
          p: 3,
          backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.03)'
            : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(0,0,0,0.05)'}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(0,0,0,0.3)'
              : '0 8px 32px rgba(25,118,210,0.12)',
            '& .icon-wrapper': {
              transform: 'scale(1.1)',
            },
            '& .gradient-overlay': {
              opacity: 0.15,
            }
          }
        }}
      >
        <Box
          className="gradient-overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: gradient,
            opacity: 0.1,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
        
        <Box
          className="icon-wrapper"
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: gradient,
            mb: 2,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <Icon sx={{ fontSize: 28, color: 'white' }} />
        </Box>

        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontFamily: 'Inter, sans-serif',
            background: gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {description}
        </Typography>
      </Card>
    </motion.div>
  );
};

const SecurityResourcesHub = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
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
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                fontFamily: 'Inter, sans-serif',
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #fff 30%, #e0e0e0 90%)'
                  : 'linear-gradient(135deg, #1a237e 30%, #0d47a1 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: theme.palette.mode === 'dark' ? 'transparent' : 'inherit',
                mb: 2
              }}
            >
              Security Resources Hub
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: 600,
                mx: 'auto',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.6,
                opacity: 0.9,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Explore our comprehensive collection of cybersecurity resources
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          {resources.map((resource, index) => (
            <Grid item xs={12} sm={6} md={3} key={resource.title}>
              <ResourceCard resource={resource} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SecurityResourcesHub;
