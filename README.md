# AI-Enhanced Cybersecurity Threat Detector

An advanced cybersecurity system that leverages transformer models to analyze network traffic and system logs for proactive threat detection and anomaly identification.

## Features

- Real-time network traffic analysis
- System log monitoring and analysis
- AI-powered threat detection using transformer models
- Interactive dashboard for threat visualization
- Role-based access control
- Real-time alerts and notifications

## Tech Stack

### Frontend
- React.js for UI components
- D3.js for data visualization
- Material-UI for component styling

### Backend
- Python with FastAPI
- PostgreSQL for persistent storage
- Redis for caching
- Hugging Face transformers for AI models

### DevOps
- Docker for containerization
- Docker Compose for service orchestration

## Prerequisites

- Python 3.9+
- Node.js 18+
- Docker and Docker Compose
- PostgreSQL 14+
- Redis 6+

## Project Structure

```
.
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core functionality
│   │   ├── models/         # Database models
│   │   └── services/       # Business logic
│   ├── tests/              # Backend tests
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   └── services/      # API services
│   └── package.json       # Node.js dependencies
├── ml/                    # Machine learning models
│   ├── models/           # Trained models
│   ├── training/         # Training scripts
│   └── utils/            # ML utilities
├── docker/               # Docker configuration
├── docker-compose.yml    # Service orchestration
└── README.md            # Project documentation
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt

   # Frontend
   cd frontend
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the services:
   ```bash
   docker-compose up -d
   ```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Development

### Backend Development
```bash
cd backend
uvicorn app.main:app --reload
```

### Frontend Development
```bash
cd frontend
npm run dev
```

## Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## Security Considerations

- All sensitive data is encrypted at rest and in transit
- Role-based access control (RBAC) implementation
- Regular security audits and updates
- Compliance with GDPR and other relevant regulations

## License

MIT License - see LICENSE file for details
