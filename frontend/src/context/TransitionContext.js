import React, { createContext, useContext, useState } from 'react';
import { Box, Fade, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';

const TransitionContext = createContext();

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();
  
  // Reset transition state on location change
  React.useEffect(() => {
    setIsTransitioning(false);
  }, [location.pathname]);

  const LoadingOverlay = () => (
    <Fade in={isTransitioning}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme => 
            theme.palette.mode === 'dark' 
              ? 'rgba(10, 25, 41, 0.7)' 
              : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: theme => theme.zIndex.drawer + 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CircularProgress size={48} />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              bgcolor: theme => 
                theme.palette.mode === 'dark' 
                  ? 'rgba(33, 150, 243, 0.1)' 
                  : 'rgba(33, 150, 243, 0.05)',
              filter: 'blur(20px)',
            }}
          />
        </Box>
      </Box>
    </Fade>
  );

  return (
    <TransitionContext.Provider value={{ isTransitioning, setIsTransitioning }}>
      {children}
      <LoadingOverlay />
    </TransitionContext.Provider>
  );
};
