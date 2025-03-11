import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  CheckCircle as ResolvedIcon,
  Cancel as FalsePositiveIcon
} from '@mui/icons-material';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [threatLevelFilter, setThreatLevelFilter] = useState('all');

  useEffect(() => {
    // Simulated data - replace with actual API calls
    setTimeout(() => {
      setAlerts([
        {
          id: 1,
          timestamp: '2025-03-10T19:45:00Z',
          title: 'Suspicious outbound connection detected',
          description: 'Multiple connection attempts to known malicious IP',
          threatLevel: 'HIGH',
          status: 'open',
          source_ip: '192.168.1.100',
          destination_ip: '203.0.113.100'
        },
        {
          id: 2,
          timestamp: '2025-03-10T19:30:00Z',
          title: 'Unusual login pattern detected',
          description: 'Multiple failed login attempts from different locations',
          threatLevel: 'MEDIUM',
          status: 'investigating',
          source_ip: '192.168.1.101',
          destination_ip: '203.0.113.101'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    setDialogOpen(true);
  };

  const handleStatusChange = async (alertId, newStatus, notes = '') => {
    // Implement status update logic here
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: newStatus } 
        : alert
    ));
    setDialogOpen(false);
  };

  const getThreatLevelColor = (level) => {
    switch (level) {
      case 'CRITICAL':
        return 'error';
      case 'HIGH':
        return 'error';
      case 'MEDIUM':
        return 'warning';
      case 'LOW':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'error';
      case 'investigating':
        return 'warning';
      case 'resolved':
        return 'success';
      case 'false_positive':
        return 'default';
      default:
        return 'default';
    }
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
        Security Alerts
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="investigating">Investigating</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
            <MenuItem value="false_positive">False Positive</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Threat Level</InputLabel>
          <Select
            value={threatLevelFilter}
            label="Threat Level"
            onChange={(e) => setThreatLevelFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="CRITICAL">Critical</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="LOW">Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Threat Level</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Source IP</TableCell>
              <TableCell>Destination IP</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    {new Date(alert.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>{alert.title}</TableCell>
                  <TableCell>
                    <Chip 
                      label={alert.threatLevel}
                      color={getThreatLevelColor(alert.threatLevel)}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={alert.status}
                      color={getStatusColor(alert.status)}
                    />
                  </TableCell>
                  <TableCell>{alert.source_ip}</TableCell>
                  <TableCell>{alert.destination_ip}</TableCell>
                  <TableCell>
                    <IconButton 
                      size="small"
                      onClick={() => handleAlertClick(alert)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={alerts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Alert Detail Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedAlert && (
          <>
            <DialogTitle>Alert Details</DialogTitle>
            <DialogContent>
              <Typography variant="h6" gutterBottom>
                {selectedAlert.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedAlert.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Source IP: {selectedAlert.source_ip}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Destination IP: {selectedAlert.destination_ip}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                margin="normal"
                label="Resolution Notes"
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button 
                startIcon={<ResolvedIcon />}
                onClick={() => handleStatusChange(selectedAlert.id, 'resolved')}
                color="success"
              >
                Mark as Resolved
              </Button>
              <Button
                startIcon={<FalsePositiveIcon />}
                onClick={() => handleStatusChange(selectedAlert.id, 'false_positive')}
                color="warning"
              >
                Mark as False Positive
              </Button>
              <Button onClick={() => setDialogOpen(false)}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Alerts;
