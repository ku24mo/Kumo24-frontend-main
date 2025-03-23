import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const scanHistory = [
  { id: 1, date: '2025-03-23', result: 'Passed' },
  { id: 2, date: '2025-03-22', result: 'Failed' },
];

function Dashboard() {
  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Scan History
      </Typography>
      <List>
        {scanHistory.map((scan) => (
          <ListItem key={scan.id}>
            <ListItemText primary={`Date: ${scan.date}`} secondary={`Result: ${scan.result}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Dashboard;
