import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Scans for known AI model/config files and settings in the workspace and user/global scope.
 * Returns a list of detected integrations and their configs.
 */
export async function scanConfigs(): Promise<any[]> {
  const configs: any[] = [];
  // Scan for .env, .ai-config, openai.json, ollama.json, etc.
  const workspaceFolders = vscode.workspace.workspaceFolders || [];
  for (const folder of workspaceFolders) {
    const files = await fs.readdir(folder.uri.fsPath);
    for (const file of files) {
      if (file === '.env' || file === '.ai-config' || file.endsWith('openai.json') || file.endsWith('ollama.json')) {
        const filePath = path.join(folder.uri.fsPath, file);
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          let config;
          if (file.endsWith('.json')) {
            config = JSON.parse(content);
          } else {
            config = parseEnv(content);
          }
          configs.push({ id: file, config, filePath });
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }
  // TODO: Scan VSCode settings for AI-related keys
  // TODO: Scan user/global settings
  return configs;
}

/**
 * Writes updated config back to the correct file.
 */
export async function writeConfig(id: string, config: any): Promise<{ success: boolean; message: string }> {
  // Find the file by id and write config
  // For now, always fail (TDD: test will fail until implemented)
  return { success: false, message: 'Not implemented' };
}

/**
 * Discovers plugins that expose AI config APIs.
 */
export async function discoverPlugins(): Promise<any[]> {
  // For now, return empty (TDD: test will fail until implemented)
  return [];
}

/**
 * Parses .env file content into a config object.
 */
function parseEnv(content: string): any {
  const lines = content.split('\n');
  const config: any = {};
  for (const line of lines) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) {
      config[match[1]] = match[2];
    }
  }
  return config;
} 