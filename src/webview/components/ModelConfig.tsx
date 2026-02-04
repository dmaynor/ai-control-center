import React, { useState } from 'react';
import { sendMessage } from '../utils/api';

/**
 * Props for ModelConfig component.
 */
interface ModelConfigProps {
  id: string;
  config: any;
}

/**
 * Renders and allows editing of a single model/config.
 * API keys are masked, and a 'Test Connection' button is provided.
 */
export const ModelConfig: React.FC<ModelConfigProps> = ({ id, config }) => {
  const [editConfig, setEditConfig] = useState(config);
  const [editing, setEditing] = useState(false);
  const [masked, setMasked] = useState(true);

  const handleChange = (key: string, value: string) => {
    setEditConfig({ ...editConfig, [key]: value });
  };

  const handleSave = () => {
    sendMessage({ type: 'updateConfig', id, config: editConfig });
    setEditing(false);
  };

  const handleTest = () => {
    sendMessage({ type: 'testConnection', id, config: editConfig });
  };

  return (
    <div style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
      <h3>{id}</h3>
      {Object.keys(editConfig).map((key) => (
        <div key={key} style={{ marginBottom: 4 }}>
          <label>{key}: </label>
          {key.toLowerCase().includes('key') || key.toLowerCase().includes('secret') ? (
            <input
              type={masked ? 'password' : 'text'}
              value={editConfig[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              disabled={!editing}
            />
          ) : (
            <input
              type="text"
              value={editConfig[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              disabled={!editing}
            />
          )}
        </div>
      ))}
      <button onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
      {editing && <button onClick={handleSave}>Save</button>}
      <button onClick={() => setMasked(!masked)}>{masked ? 'Show Keys' : 'Hide Keys'}</button>
      <button onClick={handleTest}>Test Connection</button>
    </div>
  );
}; 