#!/usr/bin/env -S node --no-warnings

import React from 'react';
import { render } from 'ink';

import { Engine } from './game/index.js';
import UI from './ui/index.js';

render(<UI engine={new Engine()} />);
