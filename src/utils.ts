import process from "node:process";
import path from 'node:path';
import fs from 'node:fs';

export const isProduction = () => process.env['NODE_ENV'] === 'production';

// Probably with bugs
export const debug = (...logs: any[]) => {
  if (isProduction()) return;

  const logFile = path.resolve(import.meta.dirname, 'debug.log');
  const formattedLogs = logs.map((log) => `${new Date().toISOString()}: ${import.meta.filename}: ${JSON.stringify(log)}`);

  fs.writeFileSync(logFile, `${formattedLogs.join('\n')}\n`, { flag: 'a+' });
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
