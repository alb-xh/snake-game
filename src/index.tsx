#!/usr/bin/env -S node --no-warnings

import React from 'react';
import { render } from 'ink';

import Config from './config/index.js';
import { Engine, classicField, classicTheme } from './game/index.js';
import UI from './ui/index.js';
import DB from './db/index.js';
import { firebaseConfig } from './db/config.js';

const config = Config.load();
const db = DB.init(firebaseConfig);
const engine = new Engine(classicField, classicTheme);

render(<UI config={config} engine={engine} db={db} />);
