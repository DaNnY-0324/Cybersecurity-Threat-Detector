import React, { useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const HeroAnimation = () => {
  const theme = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let connections = [];
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.isInfected = Math.random() < 0.1;
        this.detectionRadius = Math.random() * 50 + 50;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.isInfected 
          ? theme.palette.error.main 
          : theme.palette.primary.main;
        ctx.fill();
        ctx.closePath();

        // Draw detection radius with pulse effect
        if (this.isInfected) {
          const time = Date.now() * 0.001;
          const pulseSize = Math.sin(time * 2) * 5 + this.detectionRadius;
          ctx.beginPath();
          ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
          ctx.strokeStyle = `${theme.palette.error.main}33`;
          ctx.stroke();
          ctx.closePath();
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
    }

    // Connection class
    class Connection {
      constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.life = 100;
        this.maxLife = 100;
      }

      draw() {
        const distance = Math.hypot(this.p1.x - this.p2.x, this.p1.y - this.p2.y);
        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(this.p1.x, this.p1.y);
          ctx.lineTo(this.p2.x, this.p2.y);
          
          const alpha = (this.life / this.maxLife) * 0.5;
          ctx.strokeStyle = this.p1.isInfected || this.p2.isInfected
            ? `${theme.palette.error.main}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`
            : `${theme.palette.primary.main}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
          
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.closePath();
        }
      }

      update() {
        this.life--;
      }
    }

    // Initialize particles
    const init = () => {
      particles = [];
      connections = [];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
      }
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = theme.palette.mode === 'dark' 
        ? 'rgba(0, 0, 0, 0.1)' 
        : 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Create new connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (distance < 150 && Math.random() < 0.03) {
            connections.push(new Connection(p1, p2));
          }
        });
      });

      // Update and draw connections
      connections = connections.filter(conn => {
        conn.update();
        conn.draw();
        return conn.life > 0;
      });

      // Spread infection
      particles.forEach(p1 => {
        if (p1.isInfected) {
          particles.forEach(p2 => {
            if (!p2.isInfected) {
              const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
              if (distance < p1.detectionRadius && Math.random() < 0.001) {
                p2.isInfected = true;
              }
            }
          });
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        '& canvas': {
          width: '100%',
          height: '100%',
        },
      }}
    >
      <canvas ref={canvasRef} />
    </Box>
  );
};

export default HeroAnimation;
