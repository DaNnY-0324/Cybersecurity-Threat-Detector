from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON, Boolean, Enum
from sqlalchemy.orm import relationship
import enum
from .base import BaseModel

class ThreatLevel(enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class UserRole(enum.Enum):
    ADMIN = "admin"
    ANALYST = "analyst"
    VIEWER = "viewer"

class User(BaseModel):
    __tablename__ = "users"

    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(Enum(UserRole), default=UserRole.VIEWER)
    is_active = Column(Boolean, default=True)
    
    alerts = relationship("Alert", back_populates="assigned_to")

class NetworkTraffic(BaseModel):
    __tablename__ = "network_traffic"

    source_ip = Column(String)
    destination_ip = Column(String)
    protocol = Column(String)
    source_port = Column(Integer)
    destination_port = Column(Integer)
    packet_size = Column(Integer)
    timestamp = Column(DateTime)
    raw_data = Column(JSON)
    anomaly_score = Column(Float)
    
    alerts = relationship("Alert", back_populates="network_traffic")

class Alert(BaseModel):
    __tablename__ = "alerts"

    title = Column(String)
    description = Column(String)
    threat_level = Column(Enum(ThreatLevel))
    status = Column(String)  # open, investigating, resolved, false_positive
    network_traffic_id = Column(Integer, ForeignKey("network_traffic.id"))
    assigned_to_id = Column(Integer, ForeignKey("users.id"))
    resolution_notes = Column(String, nullable=True)
    resolved_at = Column(DateTime, nullable=True)
    
    network_traffic = relationship("NetworkTraffic", back_populates="alerts")
    assigned_to = relationship("User", back_populates="alerts")

class SystemLog(BaseModel):
    __tablename__ = "system_logs"

    source = Column(String)  # application name or system component
    log_level = Column(String)  # info, warning, error, critical
    message = Column(String)
    metadata = Column(JSON)
    anomaly_score = Column(Float)

class AnomalyDetectionModel(BaseModel):
    __tablename__ = "anomaly_detection_models"

    name = Column(String)
    model_type = Column(String)  # transformer, statistical, etc.
    version = Column(String)
    metrics = Column(JSON)  # performance metrics
    parameters = Column(JSON)  # model hyperparameters
    last_trained = Column(DateTime)
    is_active = Column(Boolean, default=False)
    
    def __repr__(self):
        return f"<AnomalyDetectionModel {self.name} v{self.version}>"
