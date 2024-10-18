import React from 'react';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import { Box } from 'ink';

import { Difficulty, Event, FrameData, Engine } from '../game/index.js';
import Selector from './Selector.js';
import View from './View.js';

export default function UI ({ engine }: { engine: Engine }) {
  const [ frame, setFrame ] = React.useState<FrameData | null>(null);

  React.useEffect(() => {
    engine.on(Event.UpdateFrameData, setFrame);
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
          : <View frame={frame} />
      }
    </Box>
  );
}
