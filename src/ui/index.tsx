import React from 'react';

import { Box } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

import Selector from './Selector.js';
import { Difficulty, Maps } from './enums.js';
import Game from './game.js';

export default function UI () {
  const [ difficulty, setDifficulty ] = React.useState<string | null>(null);
  const [ map, setMap ] = React.useState<string | null>(null);

  let slot;

  if (!difficulty) {
    slot = <Selector name="difficulty" options={Object.values(Difficulty)} onChange={setDifficulty} />;
  } else if (!map) {
    slot = <Selector name="map" options={Object.values(Maps)} onChange={setMap} />;
  } else {
    slot = <Game difficulty={difficulty} map={map} />
  }

  return (
    <Box alignItems='center' flexDirection='column'>
      <Gradient name='rainbow'>
        <BigText text="Snake game"/>
      </Gradient>
      {slot}
    </Box>
  );
}
