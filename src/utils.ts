import process from "node:process";
import path from 'node:path';
import fs from 'node:fs';

export const isProduction = () => process.env['NODE_ENV'] === 'production';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const debug = ((filePath: string) => (...logs: any[]) => {
  if (isProduction()) return;
  const formattedLogs = logs.map((log) => `${new Date().toISOString()}: ${JSON.stringify(log)}`);
  fs.writeFileSync(filePath, `${formattedLogs.join('\n')}\n`, { flag: 'a+' });
})(path.resolve(import.meta.dirname, '../debug.log'));
