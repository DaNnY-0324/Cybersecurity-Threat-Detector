import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const NetworkTraffic = () => {
  const [loading, setLoading] = useState(true);
  const [trafficData, setTrafficData] = useState([]);
  const [recentConnections, setRecentConnections] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [timeRange, setTimeRange] = useState('1h');
  const [protocolFilter, setProtocolFilter] = useState('all');

  useEffect(() => {
    // Simulated data - replace with actual API calls
    setTimeout(() => {
      const mockTrafficData = [
        { time: '00:00', inbound: 1200, outbound: 800, anomalyScore: 0.2 },
        { time: '00:10', inbound: 1500, outbound: 900, anomalyScore: 0.3 },
        { time: '00:20', inbound: 1800, outbound: 1200, anomalyScore: 0.8 },
        { time: '00:30', inbound: 1300, outbound: 1000, anomalyScore: 0.4 },
        { time: '00:40', inbound: 1600, outbound: 1100, anomalyScore: 0.2 },
        { time: '00:50', inbound: 1400, outbound: 900, anomalyScore: 0.1 }
      ];

      const mockConnections = [
        {
          id: 1,
          timestamp: '2025-03-10T19:59:00Z',
          source_ip: '192.168.1.100',
          destination_ip: '203.0.113.100',
          protocol: 'TCP',
          port: 443,
          bytes_transferred: 15234,
          anomaly_score: 0.2
        },
        {
          id: 2,
          timestamp: '2025-03-10T19:58:30Z',
          source_ip: '192.168.1.101',
          destination_ip: '203.0.113.101',
          protocol: 'UDP',
          port: 53,
          bytes_transferred: 1234,
          anomaly_score: 0.8
        }
      ];

      setTrafficData(mockTrafficData);
      setRecentConnections(mockConnections);
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getAnomalyScoreColor = (score) => {
    if (score >= 0.8) return '#ff0000';
    if (score >= 0.6) return '#ffa500';
    if (score >= 0.4) return '#ffff00';
    return '#00ff00';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Network Traffic Analysis
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="1h">Last Hour</MenuItem>
            <MenuItem value="6h">Last 6 Hours</MenuItem>
            <MenuItem value="24h">Last 24 Hours</MenuItem>
            <MenuItem value="7d">Last 7 Days</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Protocol</InputLabel>
          <Select
            value={protocolFilter}
            label="Protocol"
            onChange={(e) => setProtocolFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="TCP">TCP</MenuItem>
            <MenuItem value="UDP">UDP</MenuItem>
            <MenuItem value="ICMP">ICMP</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Traffic Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Traffic
              </Typography>
              <Typography variant="h4">
                {(15234 + 12345).toLocaleString()} bytes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Connections
              </Typography>
              <Typography variant="h4">
                {42}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Anomaly Score
              </Typography>
              <Typography variant="h4" color="warning.main">
                0.32
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Traffic Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Network Traffic Volume
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="inbound" 
                  stackId="1"
                  stroke="#8884d8" 
                  fill="#8884d8" 
                />
                <Area 
                  type="monotone" 
                  dataKey="outbound" 
                  stackId="1"
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Anomaly Score Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="anomalyScore" 
                  stroke="#ff0000" 
                  dot={{ stroke: '#ff0000', strokeWidth: 2 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Connections Table */}
      <Typography variant="h6" gutterBottom>
        Recent Connections
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Source IP</TableCell>
              <TableCell>Destination IP</TableCell>
              <TableCell>Protocol</TableCell>
              <TableCell>Port</TableCell>
              <TableCell>Bytes</TableCell>
              <TableCell>Anomaly Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentConnections
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((connection) => (
                <TableRow key={connection.id}>
                  <TableCell>
                    {new Date(connection.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>{connection.source_ip}</TableCell>
                  <TableCell>{connection.destination_ip}</TableCell>
                  <TableCell>{connection.protocol}</TableCell>
                  <TableCell>{connection.port}</TableCell>
                  <TableCell>{connection.bytes_transferred.toLocaleString()}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: '100%',
                        height: 20,
                        backgroundColor: getAnomalyScoreColor(connection.anomaly_score),
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'black'
                      }}
                    >
                      {connection.anomaly_score.toFixed(2)}
                    </Box>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={recentConnections.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default NetworkTraffic;
