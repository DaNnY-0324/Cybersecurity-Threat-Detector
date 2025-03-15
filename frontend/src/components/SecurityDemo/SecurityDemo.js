import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const NetworkNode = ({ x, y, size = 20, color, pulseColor }) => (
  <motion.circle
    cx={x}
    cy={y}
    r={size}
    fill={color}
    initial={{ scale: 1 }}
    animate={{
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

const Connection = ({ start, end, color, animate }) => {
  const pathLength = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );

  return (
    <motion.line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke={color}
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={animate ? {
        pathLength: [0, 1],
        opacity: [0.2, 1, 0.2]
      } : {}}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

const AttackVector = ({ start, end }) => {
  const theme = useTheme();
  
  return (
    <motion.g>
      <motion.line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={theme.palette.error.main}
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: [0, 1],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.circle
        cx={end.x}
        cy={end.y}
        r="8"
        fill={theme.palette.error.main}
        initial={{ scale: 0 }}
        animate={{
          scale: [0, 1.5, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.g>
  );
};

const SecurityDemo = () => {
  const theme = useTheme();
  const [showAttack, setShowAttack] = useState(false);
  const [detectionActive, setDetectionActive] = useState(false);

  useEffect(() => {
    // Simulate attack patterns
    const attackInterval = setInterval(() => {
      setShowAttack(true);
      setTimeout(() => {
        setShowAttack(false);
        setDetectionActive(true);
        setTimeout(() => {
          setDetectionActive(false);
        }, 2000);
      }, 2000);
    }, 6000);

    return () => clearInterval(attackInterval);
  }, []);

  const networkNodes = [
    { x: 150, y: 150, type: 'server' },
    { x: 300, y: 100, type: 'client' },
    { x: 300, y: 200, type: 'client' },
    { x: 450, y: 150, type: 'endpoint' },
  ];

  const connections = [
    { start: networkNodes[0], end: networkNodes[1] },
    { start: networkNodes[0], end: networkNodes[2] },
    { start: networkNodes[1], end: networkNodes[3] },
    { start: networkNodes[2], end: networkNodes[3] },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        height: 400,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(0,0,0,0.2)' 
          : 'rgba(255,255,255,0.1)',
        borderRadius: 4,
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.mode === 'dark' 
          ? 'rgba(255,255,255,0.1)' 
          : 'rgba(0,0,0,0.1)'}`,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          color: detectionActive ? theme.palette.success.main : 'inherit',
          transition: 'color 0.3s ease'
        }}
      >
        {detectionActive ? 'Threat Detected & Blocked' : 'Network Status: Normal'}
      </Typography>
      
      <svg width="100%" height="100%" viewBox="0 0 600 300">
        {/* Network Connections */}
        {connections.map((conn, i) => (
          <Connection
            key={i}
            start={conn.start}
            end={conn.end}
            color={theme.palette.primary.main}
            animate={true}
          />
        ))}

        {/* Network Nodes */}
        {networkNodes.map((node, i) => (
          <NetworkNode
            key={i}
            x={node.x}
            y={node.y}
            color={theme.palette.primary.main}
            pulseColor={theme.palette.secondary.main}
          />
        ))}

        {/* Attack Vector */}
        {showAttack && (
          <AttackVector
            start={{ x: 50, y: 50 }}
            end={networkNodes[Math.floor(Math.random() * networkNodes.length)]}
          />
        )}

        {/* Detection Shield */}
        {detectionActive && (
          <motion.circle
            cx={300}
            cy={150}
            r={100}
            fill="none"
            stroke={theme.palette.success.main}
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
            transition={{ duration: 1 }}
          />
        )}
      </svg>
    </Box>
  );
};

export default SecurityDemo;
