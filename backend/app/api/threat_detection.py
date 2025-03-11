from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from datetime import datetime

from ..core.database import get_db
from ..models.models import NetworkTraffic, Alert, User, ThreatLevel
from ..services.model_service import AnomalyDetector
from .auth import get_current_user

router = APIRouter()
anomaly_detector = AnomalyDetector()

@router.post("/analyze-traffic")
async def analyze_network_traffic(
    network_data: Dict[str, Any],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Analyze incoming network traffic for potential threats."""
    try:
        # Analyze traffic using our AI model
        analysis_result = anomaly_detector.analyze_traffic(network_data)
        
        # Create network traffic record
        traffic = NetworkTraffic(
            source_ip=network_data["source_ip"],
            destination_ip=network_data["destination_ip"],
            protocol=network_data["protocol"],
            source_port=network_data["source_port"],
            destination_port=network_data["destination_port"],
            packet_size=network_data.get("packet_size", 0),
            timestamp=datetime.utcnow(),
            raw_data=network_data,
            anomaly_score=analysis_result["anomaly_score"]
        )
        db.add(traffic)
        
        # If anomaly detected, create alert
        if analysis_result["is_anomaly"]:
            alert = Alert(
                title=f"Anomalous Traffic Detected from {network_data['source_ip']}",
                description=f"Suspicious network activity detected with anomaly score: {analysis_result['anomaly_score']:.2f}",
                threat_level=ThreatLevel[analysis_result["threat_level"]],
                status="open",
                network_traffic=traffic,
                assigned_to_id=current_user.id
            )
            db.add(alert)
        
        db.commit()
        db.refresh(traffic)
        
        return {
            "analysis": analysis_result,
            "traffic_id": traffic.id,
            "alert_created": analysis_result["is_anomaly"]
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error analyzing network traffic: {str(e)}"
        )

@router.get("/alerts")
async def get_alerts(
    status: str = None,
    threat_level: ThreatLevel = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get list of security alerts with optional filters."""
    query = db.query(Alert)
    
    if status:
        query = query.filter(Alert.status == status)
    if threat_level:
        query = query.filter(Alert.threat_level == threat_level)
    
    alerts = query.order_by(Alert.created_at.desc()).all()
    return alerts

@router.put("/alerts/{alert_id}")
async def update_alert(
    alert_id: int,
    status: str,
    resolution_notes: str = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update alert status and add resolution notes."""
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found"
        )
    
    alert.status = status
    if status in ["resolved", "false_positive"]:
        alert.resolved_at = datetime.utcnow()
    if resolution_notes:
        alert.resolution_notes = resolution_notes
    
    db.commit()
    db.refresh(alert)
    return alert

@router.get("/traffic/stats")
async def get_traffic_stats(
    time_range: str = "24h",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get network traffic statistics for the specified time range."""
    # Calculate time range
    now = datetime.utcnow()
    if time_range == "24h":
        start_time = now - timedelta(hours=24)
    elif time_range == "7d":
        start_time = now - timedelta(days=7)
    elif time_range == "30d":
        start_time = now - timedelta(days=30)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid time range. Use '24h', '7d', or '30d'"
        )
    
    # Get traffic statistics
    traffic_stats = {
        "total_packets": db.query(NetworkTraffic).filter(
            NetworkTraffic.timestamp >= start_time
        ).count(),
        "anomalies": db.query(NetworkTraffic).filter(
            NetworkTraffic.timestamp >= start_time,
            NetworkTraffic.anomaly_score > 0.75
        ).count(),
        "alerts": db.query(Alert).filter(
            Alert.created_at >= start_time
        ).count()
    }
    
    return traffic_stats
