import React from 'react';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import { Box } from 'ink';

import { Event, FrameData, Engine } from '../game/index.js';

import Frame from './Frame.js';

export default function UI ({ engine }: { engine: Engine }) {
  const [ frameData, setFrameData ] = React.useState<FrameData | null>(null);

  React.useEffect(() => {
    engine.on(Event.UpdateFrameData, setFrameData);
    engine.emit(Event.Start);

    return () => {
      engine.removeListener(Event.UpdateFrameData, setFrameData);
      engine.emit('reset');
    }
  }, []);

  return (
    <Box alignItems='center' flexDirection='column'>
      <Gradient name='rainbow'>
        <BigText text="Snake game"/>
      </Gradient>
      {frameData && <Frame data={frameData} />}
    </Box>
  );
}
