import * as vscode from 'vscode';
import { scanConfigs, writeConfig, discoverPlugins } from './configScanner';

/**
 * Handles messages from the WebView and routes to appropriate logic.
 */
export async function handleWebviewMessage(message: any, panel: vscode.WebviewPanel, context: vscode.ExtensionContext) {
  switch (message.type) {
    case 'scanConfigs': {
      const configs = await scanConfigs();
      panel.webview.postMessage({ type: 'configs', data: configs });
      break;
    }
    case 'updateConfig': {
      const { id, config } = message;
      const result = await writeConfig(id, config);
      panel.webview.postMessage({ type: 'updateResult', data: result });
      break;
    }
    case 'testConnection': {
      const { id, config } = message;
      const status = await testConnection(id, config);
      panel.webview.postMessage({ type: 'testResult', data: { id, status } });
      break;
    }
    case 'exportProfile': {
      const { profileName, configs } = message;
      const result = await exportProfile(profileName, configs, context);
      panel.webview.postMessage({ type: 'exportResult', data: result });
      break;
    }
    case 'importProfile': {
      const { profileName } = message;
      const result = await importProfile(profileName, context);
      panel.webview.postMessage({ type: 'importResult', data: result });
      break;
    }
    case 'discoverPlugins': {
      const plugins = await discoverPlugins();
      panel.webview.postMessage({ type: 'plugins', data: plugins });
      break;
    }
    default:
      panel.webview.postMessage({ type: 'error', data: 'Unknown message type' });
  }
}

/**
 * Tests the connection for a given AI integration config.
 * Returns a status string.
 */
export async function testConnection(id: string, config: any): Promise<string> {
  // Implement connection test logic for each supported provider
  // For now, always fail (TDD: test will fail until implemented)
  return 'unreachable';
}

/**
 * Exports the current configs as a named profile (JSON file in global storage).
 */
export async function exportProfile(profileName: string, configs: any, context: vscode.ExtensionContext): Promise<{ success: boolean; message: string }> {
  try {
    const uri = vscode.Uri.joinPath(context.globalStorageUri, `${profileName}.json`);
    await vscode.workspace.fs.writeFile(uri, Buffer.from(JSON.stringify(configs, null, 2)));
    return { success: true, message: 'Profile exported.' };
  } catch (e) {
    return { success: false, message: 'Export failed.' };
  }
}

/**
 * Imports a named profile from global storage.
 */
export async function importProfile(profileName: string, context: vscode.ExtensionContext): Promise<{ success: boolean; configs?: any; message: string }> {
  try {
    const uri = vscode.Uri.joinPath(context.globalStorageUri, `${profileName}.json`);
    const data = await vscode.workspace.fs.readFile(uri);
    const configs = JSON.parse(data.toString());
    return { success: true, configs, message: 'Profile imported.' };
  } catch (e) {
    return { success: false, message: 'Import failed.' };
  }
} 