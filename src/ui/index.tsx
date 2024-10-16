import React from 'react';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import { Box } from 'ink';

import GameEngine, { Difficulty, Event, Frame as FrameType, State } from '../game-engine.js';
import Selector from './Selector.js';
import Frame from './Frame.js';

type Props = { engine: GameEngine };

export default function UI ({ engine }: Props) {
  const [ difficulty, setDifficulty ] = React.useState<string | null>(null);
  const [ frame, setFrame ] = React.useState<FrameType | null>(null);

  React.useEffect(() => {
    if (difficulty) {
      engine.on(Event.NewFrame, setFrame);
      engine.start({ difficulty } as any);
    }

    return () => {
      setFrame(null);
      engine.reset();
    }
  }, [ difficulty ]);

  return (
    <Box alignItems='center' flexDirection='column'>
      <Gradient name='rainbow'>
        <BigText text="Snake game"/>
      </Gradient>
      { !difficulty && <Selector name="difficulty" options={Object.values(Difficulty)} onChange={setDifficulty} /> }
      { frame && <Frame frame={frame} /> }
    </Box>
  );
}
