from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np
from typing import List, Dict, Any
import json
import logging

logger = logging.getLogger(__name__)

class ThreatDetectionModel:
    def __init__(self, model_path: str = "microsoft/deberta-v3-base"):
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_path)
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model.to(self.device)
        self.model.eval()

    def preprocess_network_data(self, network_data: Dict[str, Any]) -> str:
        """Convert network traffic data into a formatted string for the model."""
        return (
            f"Source IP: {network_data['source_ip']} "
            f"Destination IP: {network_data['destination_ip']} "
            f"Protocol: {network_data['protocol']} "
            f"Source Port: {network_data['source_port']} "
            f"Destination Port: {network_data['destination_port']}"
        )

    @torch.no_grad()
    def predict_threat(self, network_data: Dict[str, Any]) -> Dict[str, float]:
        """Predict threat level from network traffic data."""
        try:
            text = self.preprocess_network_data(network_data)
            inputs = self.tokenizer(
                text,
                return_tensors="pt",
                truncation=True,
                max_length=512
            ).to(self.device)
            
            outputs = self.model(**inputs)
            probabilities = torch.softmax(outputs.logits, dim=1)
            
            return {
                "anomaly_score": float(probabilities[0][1].cpu().numpy()),
                "confidence": float(torch.max(probabilities).cpu().numpy())
            }
        except Exception as e:
            logger.error(f"Error in threat prediction: {str(e)}")
            return {"anomaly_score": 0.0, "confidence": 0.0}

    def batch_predict(self, network_data_list: List[Dict[str, Any]]) -> List[Dict[str, float]]:
        """Batch prediction for multiple network traffic entries."""
        return [self.predict_threat(data) for data in network_data_list]

class AnomalyDetector:
    def __init__(self):
        self.model = ThreatDetectionModel()
        self.threshold = 0.75  # Configurable threshold for anomaly detection

    def analyze_traffic(self, network_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze network traffic and detect potential threats."""
        prediction = self.model.predict_threat(network_data)
        
        is_anomaly = prediction["anomaly_score"] > self.threshold
        threat_level = self._determine_threat_level(prediction["anomaly_score"])
        
        return {
            "is_anomaly": is_anomaly,
            "threat_level": threat_level,
            "anomaly_score": prediction["anomaly_score"],
            "confidence": prediction["confidence"],
            "original_data": network_data
        }

    def _determine_threat_level(self, anomaly_score: float) -> str:
        """Determine threat level based on anomaly score."""
        if anomaly_score > 0.9:
            return "CRITICAL"
        elif anomaly_score > 0.8:
            return "HIGH"
        elif anomaly_score > 0.7:
            return "MEDIUM"
        else:
            return "LOW"

    def update_threshold(self, new_threshold: float):
        """Update the anomaly detection threshold."""
        if 0 <= new_threshold <= 1:
            self.threshold = new_threshold
        else:
            raise ValueError("Threshold must be between 0 and 1")
