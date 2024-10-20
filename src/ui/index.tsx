import React from 'react';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import { Box } from 'ink';

import { Event, FrameData, Engine } from '../game/index.js';

import Frame from './Frame.js';
import Score from './Score.js';
import { Alert } from '@inkjs/ui';

export default function UI ({ engine }: { engine: Engine }) {
  const [ score, setScore ] = React.useState<number | null>(null);
  const [ frameData, setFrameData ] = React.useState<FrameData | null>(null);
  const [ lost, setLost ] = React.useState(false);

  React.useEffect(() => {
    const onLose = () => setLost(true);

    engine.on(Event.UpdateScore, setScore);
    engine.on(Event.UpdateFrameData, setFrameData);
    engine.on(Event.Lose, onLose);
    engine.emit(Event.Start);

    return () => {
      engine.removeListener(Event.UpdateScore, setScore);
      engine.removeListener(Event.UpdateFrameData, setFrameData);
      engine.removeListener(Event.Lose, onLose);
      engine.emit(Event.Reset);
    }
  }, []);

  return (
    <Box alignItems='center' flexDirection='column'>
      <Gradient name='rainbow'>
        <BigText text="Snake game"/>
      </Gradient>
      { score !== null && <Score score={score} />}
      { frameData && <Frame data={frameData} />}
      { lost && <Alert variant="error">You lost :(</Alert>}
    </Box>
  );
}
