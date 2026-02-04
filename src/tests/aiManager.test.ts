import { scanConfigs, writeConfig, discoverPlugins } from '../configScanner';
import { testConnection, exportProfile, importProfile } from '../aiManager';

describe('AI Manager & Config Scanner', () => {
  it('should scan and find at least one AI config', async () => {
    const configs = await scanConfigs();
    expect(configs.length).toBeGreaterThan(0); // Expected: at least one config, got 0
  });

  it('should update a config and persist changes', async () => {
    const configs = await scanConfigs();
    const id = configs[0]?.id;
    const newConfig = { ...configs[0]?.config, testKey: 'testValue' };
    const result = await writeConfig(id, newConfig);
    expect(result.success).toBe(true); // Expected: true, got false
  });

  it('should validate/test a connection and return reachable', async () => {
    const configs = await scanConfigs();
    const id = configs[0]?.id;
    const status = await testConnection(id, configs[0]?.config);
    expect(status).toBe('reachable'); // Expected: reachable, got unreachable
  });

  it('should export and import a profile successfully', async () => {
    const configs = await scanConfigs();
    const exportResult = await exportProfile('testProfile', configs, { globalStorageUri: { fsPath: '/tmp' } } as any);
    expect(exportResult.success).toBe(true); // Expected: true, got false
    const importResult = await importProfile('testProfile', { globalStorageUri: { fsPath: '/tmp' } } as any);
    expect(importResult.success).toBe(true); // Expected: true, got false
    expect(importResult.configs).toEqual(configs); // Expected: configs to match
  });

  it('should discover at least one plugin', async () => {
    const plugins = await discoverPlugins();
    expect(plugins.length).toBeGreaterThan(0); // Expected: at least one plugin, got 0
  });
}); 