import React, { useState } from 'react';
import { sendMessage } from '../utils/api';

/**
 * Props for ProfileManager component.
 */
interface ProfileManagerProps {
  configs: any[];
}

/**
 * Handles export/import and switching of configuration profiles.
 */
export const ProfileManager: React.FC<ProfileManagerProps> = ({ configs }) => {
  const [profileName, setProfileName] = useState('');
  const [importName, setImportName] = useState('');

  const handleExport = () => {
    sendMessage({ type: 'exportProfile', profileName, configs });
  };

  const handleImport = () => {
    sendMessage({ type: 'importProfile', profileName: importName });
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <h2>Profile Management</h2>
      <div>
        <input
          type="text"
          placeholder="Profile name to export"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
        />
        <button onClick={handleExport}>Export Profile</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Profile name to import"
          value={importName}
          onChange={(e) => setImportName(e.target.value)}
        />
        <button onClick={handleImport}>Import Profile</button>
      </div>
    </div>
  );
}; 