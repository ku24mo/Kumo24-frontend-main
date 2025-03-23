import React, { useState } from 'react';
import './App.css';

function App() {
  const [awsAccessKey, setAwsAccessKey] = useState<string>('');
  const [awsSecretKey, setAwsSecretKey] = useState<string>('');
  const [scanResults, setScanResults] = useState<string>('');

  const handleScan = async () => {
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
    }
  };

  return (
    <div className="App">
      <h1>Kumo24 Cloud Security</h1>
      <div>
        <input
          type="text"
          placeholder="AWS Access Key"
          value={awsAccessKey}
          onChange={(e) => setAwsAccessKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="AWS Secret Key"
          value={awsSecretKey}
          onChange={(e) => setAwsSecretKey(e.target.value)}
        />
        <button onClick={handleScan}>Run Scan</button>
      </div>
      <pre>{scanResults}</pre>
    </div>
  );
}

export default App;
