import React from 'react';

import { Box } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

import GameEngine, { Difficulty } from '../game-engine.js';
import Selector from './Selector.js';

import Game from './game.js';

export default function UI () {
  const [ engine, setEngine ] = React.useState<GameEngine | null>(null);

  const onDifficultyChange = (difficulty: string) => {
    setEngine(new GameEngine({ difficulty } as any));
  };

  return (
    <Box alignItems='center' flexDirection='column'>
      <Gradient name='rainbow'>
        <BigText text="Snake game"/>
      </Gradient>
      {
        !engine
          ? <Selector name="difficulty" options={Object.values(Difficulty)} onChange={onDifficultyChange} />
          : <Game engine={engine} />
      }
    </Box>
  );
}
