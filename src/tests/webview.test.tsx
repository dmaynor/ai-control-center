import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../webview/App';
import { ModelConfig } from '../webview/components/ModelConfig';
import { ProfileManager } from '../webview/components/ProfileManager';

describe('WebView React Components', () => {
  it('should render the main App and show detected integrations', () => {
    render(<App />);
    expect(screen.getByText('Detected Integrations')).toBeInTheDocument(); // Expected: Detected Integrations, got nothing
  });

  it('should render ModelConfig and allow editing', () => {
    const config = { apiKey: 'sk-xxxx', model: 'gpt-3.5-turbo' };
    render(<ModelConfig id="openai.json" config={config} />);
    expect(screen.getByDisplayValue('sk-xxxx')).toBeInTheDocument(); // Expected: input with value sk-xxxx, got nothing
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.change(screen.getByDisplayValue('sk-xxxx'), { target: { value: 'sk-1234' } });
    expect(screen.getByDisplayValue('sk-1234')).toBeInTheDocument(); // Expected: input with value sk-1234, got nothing
  });

  it('should render ProfileManager and handle export/import', () => {
    render(<ProfileManager configs={[]} />);
    expect(screen.getByText('Profile Management')).toBeInTheDocument(); // Expected: Profile Management, got nothing
    fireEvent.change(screen.getByPlaceholderText('Profile name to export'), { target: { value: 'myProfile' } });
    fireEvent.click(screen.getByText('Export Profile'));
    // Expected: export message, got nothing
  });
}); 