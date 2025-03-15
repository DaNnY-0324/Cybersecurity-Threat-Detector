// This script generates placeholder SVG logos for integrations
const fs = require('fs');
const path = require('path');

const logos = {
  azure: {
    color: '#0089D6',
    path: 'M50 25L75 65H25L50 25z'
  },
  digitalocean: {
    color: '#0080FF',
    path: 'M35 65h15v-15H35v15zM50 50h15V35H50v15z'
  },
  splunk: {
    color: '#FF375F',
    path: 'M30 35h40v10H30zM30 55h40v10H30z'
  },
  qradar: {
    color: '#054ADA',
    path: 'M50 25c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25zm0 40c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z'
  },
  elastic: {
    color: '#FEC514',
    path: 'M35 35h30v30H35z'
  },
  paloalto: {
    color: '#FA582D',
    path: 'M25 50l25-25 25 25-25 25z'
  },
  qualys: {
    color: '#ED2B2F',
    path: 'M50 25L75 50 50 75 25 50z'
  },
  rapid7: {
    color: '#FF6D2D',
    path: 'M30 30h40v40H30z'
  },
  tenable: {
    color: '#00B4E5',
    path: 'M50 25c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25z'
  },
  crowdstrike: {
    color: '#FF0000',
    path: 'M50 25L75 65H25z'
  }
};

const generateSVG = (name, { color, path }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="${path}" fill="${color}"/>
</svg>`;

const outputDir = path.join(__dirname, '../../public/assets/integrations');

// Create directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate SVG files
Object.entries(logos).forEach(([name, config]) => {
  const svg = generateSVG(name, config);
  fs.writeFileSync(path.join(outputDir, `${name}.svg`), svg);
});
