import React from 'react';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import { Box } from 'ink';

import GameEngine, { Difficulty, Event, Frame as FrameType } from '../game-engine.js';
import Selector from './Selector.js';
import Frame from './Frame.js';

type Props = { engine: GameEngine };

export default function UI ({ engine }: Props) {
  const [ frame, setFrame ] = React.useState<FrameType | null>(null);

  React.useEffect(() => {
    engine.on(Event.NewFrame, setFrame);
    return () => engine.reset();
  }, []);

  return (
    <Box alignItems='center' flexDirection='column'>
      <Gradient name='rainbow'>
        <BigText text="Snake game"/>
      </Gradient>
      {
        !frame
          ? <Selector
              name="difficulty"
              options={Object.values(Difficulty)}
              onChange={(difficulty) => engine.start({ difficulty } as any)}
            />
          : <Frame frame={frame} />
      }
    </Box>
  );
}
