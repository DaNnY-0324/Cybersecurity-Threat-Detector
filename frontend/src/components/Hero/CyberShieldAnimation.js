import React, { useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';

const CyberShieldAnimation = () => {
  const theme = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Shield parameters with dynamic scaling
    const shield = {
      segments: 16,
      radius: Math.min(canvas.width, canvas.height) * 0.35,
      thickness: Math.min(canvas.width, canvas.height) * 0.015,
      rotationSpeed: 0.0015,
      pulseSpeed: 0.03,
      glowSize: Math.min(canvas.width, canvas.height) * 0.01
    };

    // Threat particles
    class Threat {
      constructor() {
        this.reset();
      }

      reset() {
        const angle = Math.random() * Math.PI * 2;
        const distance = canvas.width;
        this.x = canvas.width / 2 + Math.cos(angle) * distance;
        this.y = canvas.height / 2 + Math.sin(angle) * distance;
        this.targetX = canvas.width / 2;
        this.targetY = canvas.height / 2;
        this.speed = Math.random() * 1 + 0.5;
        this.size = Math.random() * 3 + 2;
        this.blocked = false;
      }

      update() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < shield.radius + 20 && !this.blocked) {
          this.blocked = true;
          // Create blocking effect
          this.createBlockEffect();
        }

        if (!this.blocked && distance > 0) {
          this.x += (dx / distance) * this.speed;
          this.y += (dy / distance) * this.speed;
        }

        if (distance < 5 || (this.blocked && Math.random() < 0.02)) {
          this.reset();
        }
      }

      createBlockEffect() {
        const angle = Math.atan2(this.y - canvas.height / 2, this.x - canvas.width / 2);
        for (let i = 0; i < 5; i++) {
          blockEffects.push(new BlockEffect(this.x, this.y, angle));
        }
      }

      draw() {
        // Glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + 4, 0, Math.PI * 2);
        ctx.fillStyle = theme.palette.error.main + '33';
        ctx.fill();
        
        // Core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = theme.palette.error.main;
        ctx.fill();
      }
    }

    // Block effect particles
    class BlockEffect {
      constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle + (Math.random() - 0.5) * 1;
        this.speed = Math.random() * 4 + 2;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.02;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life -= this.decay;
        this.speed *= 0.98;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = theme.palette.primary.main + Math.floor(this.life * 255).toString(16).padStart(2, '0');
        ctx.fill();
      }
    }

    // Initialize threats and effects
    const threats = Array(15).fill().map(() => new Threat());
    let blockEffects = [];

    // Draw shield segment
    const drawShieldSegment = (angle) => {
      const pulseIntensity = (Math.sin(time * shield.pulseSpeed) + 1) * 0.5;
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const segmentAngle = (Math.PI * 2) / shield.segments;
      
      ctx.beginPath();
      ctx.arc(x, y, shield.radius, angle, angle + segmentAngle);
      ctx.strokeStyle = theme.palette.primary.main;
      ctx.lineWidth = shield.thickness;
      ctx.stroke();

      // Draw energy effect
      const energyRadius = shield.radius + Math.sin(time * shield.pulseSpeed) * 5;
      ctx.beginPath();
      ctx.arc(x, y, energyRadius, angle, angle + segmentAngle);
      ctx.strokeStyle = theme.palette.primary.main + Math.floor(pulseIntensity * 80).toString(16).padStart(2, '0');
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    // Draw scanning lines
    const drawScanLines = () => {
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const scanAngle = (time * shield.rotationSpeed * 2) % (Math.PI * 2);
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        x + Math.cos(scanAngle) * canvas.width,
        y + Math.sin(scanAngle) * canvas.width
      );
      ctx.strokeStyle = theme.palette.primary.main + '22';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = theme.palette.mode === 'dark' 
        ? 'rgba(0, 0, 0, 0.1)' 
        : 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw outer glow
      ctx.save();
      ctx.shadowBlur = shield.glowSize;
      ctx.shadowColor = theme.palette.primary.main;
      
      // Draw shield segments
      for (let i = 0; i < shield.segments; i++) {
        const angle = (i * Math.PI * 2) / shield.segments + time * shield.rotationSpeed;
        drawShieldSegment(angle);
      }
      ctx.restore();

      // Draw scan lines
      drawScanLines();

      // Update and draw threats
      threats.forEach(threat => {
        threat.update();
        threat.draw();
      });

      // Update and draw block effects
      blockEffects = blockEffects.filter(effect => {
        effect.update();
        effect.draw();
        return effect.life > 0;
      });

      time += 1;
      animationFrameId = requestAnimationFrame(animate);
    };

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

export default CyberShieldAnimation;
