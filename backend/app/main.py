from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI-Enhanced Cybersecurity Threat Detector",
    description="API for real-time cybersecurity threat detection using transformer models",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the Cybersecurity Threat Detector API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
