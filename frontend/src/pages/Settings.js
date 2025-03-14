import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack,
} from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { showNotification } = useNotification();
  const [refreshInterval, setRefreshInterval] = useState('30');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to backend
    showNotification('Settings saved successfully', 'success');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Appearance
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
              />
            }
            label="Dark Mode"
          />
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Dashboard Settings
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Auto-refresh Interval</InputLabel>
            <Select
              value={refreshInterval}
              label="Auto-refresh Interval"
              onChange={(e) => setRefreshInterval(e.target.value)}
            >
              <MenuItem value="15">15 seconds</MenuItem>
              <MenuItem value="30">30 seconds</MenuItem>
              <MenuItem value="60">1 minute</MenuItem>
              <MenuItem value="300">5 minutes</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
              }
              label="Email Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={slackNotifications}
                  onChange={(e) => setSlackNotifications(e.target.checked)}
                />
              }
              label="Slack Notifications"
            />
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
