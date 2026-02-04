/**
 * Sends a message to the VSCode extension host from the WebView.
 */
export function sendMessage(message: any) {
  if ((window as any).acquireVsCodeApi) {
    (window as any).acquireVsCodeApi().postMessage(message);
  }
}

/**
 * Registers a callback for messages from the extension host.
 */
export function onMessage(callback: (msg: any) => void) {
  window.addEventListener('message', (event) => {
    callback(event.data);
  });
} 