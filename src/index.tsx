#!/usr/bin/env -S node --no-warnings

import React from 'react';
import { render } from 'ink';

import GameEngine from './game-engine.js';
import UI from './ui/index.js';

const engine = new GameEngine();
render(<UI engine={engine} />);
