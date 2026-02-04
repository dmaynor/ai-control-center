import * as vscode from 'vscode';
import { getHtmlForWebview } from './webviewUtils';
import { handleWebviewMessage } from './aiManager';

/**
 * Activates the AI Control Center extension.
 * Registers the main command and sets up the WebView panel.
 */
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('aiControlCenter.open', () => {
      const panel = vscode.window.createWebviewPanel(
        'aiControlCenter',
        'AI Control Center',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        }
      );
      panel.webview.html = getHtmlForWebview(panel.webview, context.extensionUri);
      // Listen for messages from the WebView
      panel.webview.onDidReceiveMessage(
        (message) => handleWebviewMessage(message, panel, context),
        undefined,
        context.subscriptions
      );
    })
  );
}

/**
 * Deactivates the extension.
 */
export function deactivate() {} 