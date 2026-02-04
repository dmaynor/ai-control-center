import React, { useEffect, useState } from 'react';
import { ModelConfig } from './components/ModelConfig';
import { ProfileManager } from './components/ProfileManager';
import { sendMessage, onMessage } from './utils/api';

/**
 * Main React App for the AI Control Center WebView.
 */
export const App: React.FC = () => {
  const [configs, setConfigs] = useState<any[]>([]);
  const [plugins, setPlugins] = useState<any[]>([]);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    sendMessage({ type: 'scanConfigs' });
    sendMessage({ type: 'discoverPlugins' });
    onMessage((msg) => {
      switch (msg.type) {
        case 'configs':
          setConfigs(msg.data);
          break;
        case 'plugins':
          setPlugins(msg.data);
          break;
        case 'updateResult':
        case 'exportResult':
        case 'importResult':
        case 'testResult':
          setStatus(msg.data.message || msg.data.status);
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>AI Control Center</h1>
      <ProfileManager configs={configs} />
      <div>
        <h2>Detected Integrations</h2>
        {configs.length === 0 && <p>No AI integrations found.</p>}
        {configs.map((c) => (
          <ModelConfig key={c.id} config={c.config} id={c.id} />
        ))}
      </div>
      <div>
        <h2>Plugins</h2>
        {plugins.length === 0 && <p>No plugins detected.</p>}
        {plugins.map((p) => (
          <div key={p.id}>{p.name}</div>
        ))}
      </div>
      {status && <div style={{ marginTop: 16, color: 'red' }}>{status}</div>}
    </div>
  );
}; 