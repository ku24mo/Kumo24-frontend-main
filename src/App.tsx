import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import './App.css';

function App() {
  const [awsAccessKey, setAwsAccessKey] = useState<string>('');
  const [awsSecretKey, setAwsSecretKey] = useState<string>('');
  const [scanResults, setScanResults] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleScan = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://ku24mo-9af841c61769.herokuapp.com/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aws_access_key: awsAccessKey,
          aws_secret_key: awsSecretKey,
        }),
      });
      const data = await response.json();
      setScanResults(data.output || data.error);
    } catch (error) {
      setScanResults('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Kumo24 Cloud Security
        </Typography>
        <TextField
          fullWidth
          label="AWS Access Key"
          variant="outlined"
          value={awsAccessKey}
          onChange={(e) => setAwsAccessKey(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="AWS Secret Key"
          variant="outlined"
          value={awsSecretKey}
          onChange={(e) => setAwsSecretKey(e.target.value)}
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleScan}
          disabled={loading}
          style={{ marginTop: '20px' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Run Scan'}
        </Button>
        {scanResults && (
          <Paper elevation={2} style={{ marginTop: '20px', padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Scan Results
            </Typography>
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{scanResults}</pre>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}

export default App;
