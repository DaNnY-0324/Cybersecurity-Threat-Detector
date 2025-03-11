import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_packets: 0,
    anomalies: 0,
    alerts: 0
  });
  const [trafficData, setTrafficData] = useState([]);
  const [recentAlerts, setRecentAlerts] = useState([]);

  useEffect(() => {
    // Simulated data - replace with actual API calls
    setTimeout(() => {
      setStats({
        total_packets: 15234,
        anomalies: 23,
        alerts: 8
      });

      setTrafficData([
        { time: '00:00', packets: 1200, anomalies: 2 },
        { time: '04:00', packets: 2100, anomalies: 5 },
        { time: '08:00', packets: 3000, anomalies: 3 },
        { time: '12:00', packets: 2500, anomalies: 7 },
        { time: '16:00', packets: 2800, anomalies: 4 },
        { time: '20:00', packets: 1900, anomalies: 2 }
      ]);

      setRecentAlerts([
        {
          id: 1,
          severity: 'high',
          message: 'Suspicious outbound connection detected',
          timestamp: '2025-03-10T19:45:00Z'
        },
        {
          id: 2,
          severity: 'medium',
          message: 'Unusual login pattern detected',
          timestamp: '2025-03-10T19:30:00Z'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Network Packets
              </Typography>
              <Typography variant="h4">
                {stats.total_packets.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Anomalies Detected
              </Typography>
              <Typography variant="h4" color="error">
                {stats.anomalies}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Alerts
              </Typography>
              <Typography variant="h4" color="warning.main">
                {stats.alerts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Network Traffic Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Network Traffic Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="packets" stroke="#8884d8" />
                <Line type="monotone" dataKey="anomalies" stroke="#ff0000" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Alerts */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Recent Alerts
          </Typography>
          {recentAlerts.map((alert) => (
            <Alert
              key={alert.id}
              severity={alert.severity}
              sx={{ mb: 1 }}
            >
              <Typography variant="subtitle2">
                {new Date(alert.timestamp).toLocaleString()}
              </Typography>
              {alert.message}
            </Alert>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
