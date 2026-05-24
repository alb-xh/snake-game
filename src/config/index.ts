import os from 'os';
import path from 'path';
import fs from 'fs';
import ConfigGenerator from './generator.js';
import { safe } from '../utils.js';
import type { ConfigData } from './types.js';

export default class Config {
  constructor (public data: ConfigData) {}

  private static getPlatformConfigDir (): string {
    const homeDir = os.homedir();
    const platform = os.platform();

    switch (platform) {
        case 'win32': return process.env.APPDATA || path.join(homeDir, 'AppData', 'Roaming');
        case 'darwin': return path.join(homeDir, 'Library', 'Application Support');
        default: return process.env.XDG_CONFIG_HOME || path.join(homeDir, '.config');
    }
  }

  private static getProjectName (): string {
    const filePath = path.resolve(import.meta.dirname, '../../package.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(data);
    return json.name;
  }

  private static getConfigPath() {
    const configDir = this.getPlatformConfigDir();
    const project = this.getProjectName();
    const file = 'config.json';

    return path.resolve(configDir, project, file);
  }

  static load(): Config {
    const [ _, conf ] = safe(() => {
      const configPath = this.getConfigPath();

      if (fs.existsSync(configPath)) {
        const raw = fs.readFileSync(configPath, 'utf8');
        const data = JSON.parse(raw);

        return new Config(data);
      }
    })

    if (conf) return conf;

    const data = ConfigGenerator.generateConfig();
    const config = new Config(data);
    config.save();

    return config;
  }

  save(update: Partial<ConfigData> = {}) {
    this.data = { ...this.data, ...update };

    safe(() => {
      const configPath = Config.getConfigPath();
      const configDir = path.dirname(configPath);

      const raw = JSON.stringify(this.data, null, 2);
      
      if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });

      fs.writeFileSync(configPath, raw, 'utf8');
    });
  }
}
