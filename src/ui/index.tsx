import React from 'react';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import { Box } from 'ink';
import { Event, FrameData, Engine, Page, Keyboard } from '../game/index.js';
import { Status } from '../game/types.js';
import Frame from './Frame.js';
import Score from './Score.js';
import Edit from './Edit.js';
import Help from './Help.js';
import Leaderboard from './Leaderboard.js';
import LostAlert from './LostAlert.js';
import TopRank from './TopRank.js';
import type Config from '../config/index.js';
import type DB from '../db/index.js';

export default function UI ({ config, engine, db }: { config: Config, engine: Engine, db: DB }) {
  const [ page, setPage ] = React.useState(Page.Help);
  const [ score, setScore ] = React.useState<number>(0);
  const [ rank, setRank ] = React.useState<number | null>(null);
  const [ frameData, setFrameData ] = React.useState<FrameData | null>(null);
  const [ lost, setLost ] = React.useState(false);
  const [ leaderboard, setLeaderboard ] = React.useState<{ user: string, score: number }[]>([]);

  React.useEffect(() => {
    const onLose = () => { 
      db.getRanking(score, 20).then((rank) => {
        if (!rank) return;

        db.submitScore(config.data.user, score);

        setRank(rank);
      }).finally(() => {
        setLost(true);
      });
    };
    
    const onEditName = Keyboard.onKey({ name: 'n' }, () => { 
      engine.pause();
      setPage(Page.Edit);
    });

    const onHelp = Keyboard.onKey({ name: 'h' }, () => { 
      if (page === Page.Edit) return;
      engine.pause();

      setPage(Page.Help);
    });
    
    const onOpenLeaderboard = Keyboard.onKey({ name: 'l' }, () => { 
      if (page === Page.Edit) return;
      engine.pause();

      db.getLeaderboard().then(setLeaderboard);
      setPage(Page.Leaderboard); 
    });
    
    const onGame = Keyboard.onKey({ name: 'g' }, () => {
      if (page === Page.Edit) return;      
      setPage(Page.Game);
    });

    const onReset = Keyboard.onKey({ name: 'r' }, () => { 
      if (page === Page.Game && lost) {

        engine.reset();

        setLost(false);
        setRank(null);
        setScore(0);
      }
    });
    
    const onPause = Keyboard.onKey({ name: 'p' }, () => {
      if (page !== Page.Game) return;
      if (engine.status === Status.Running) return engine.pause();
      if (engine.status === Status.Paused) return engine.resume();
    });

    engine.on(Event.UpdateScore, setScore);
    engine.on(Event.UpdateFrameData, setFrameData);
    engine.on(Event.Lose, onLose);

    if (page === Page.Game) {
      if (engine.status === Status.Idle) engine.start();
      else if (engine.status === Status.Paused) engine.resume();
    } 

    return () => {
      Keyboard.offPress(onHelp);
      Keyboard.offPress(onEditName);
      Keyboard.offPress(onGame);
      Keyboard.offPress(onOpenLeaderboard);
      Keyboard.offPress(onPause);
      Keyboard.offPress(onReset);
      engine.removeListener(Event.UpdateScore, setScore);
      engine.removeListener(Event.UpdateFrameData, setFrameData);
      engine.removeListener(Event.Lose, onLose);
    };
  }, [ page, score, lost ]);

  return (
    <Box alignItems='center' flexDirection='column'>
      <Gradient name='rainbow'>
        <BigText text="Snake"/>
      </Gradient>
      {page === Page.Help && <Help />}
      {page === Page.Edit && <Edit config={config} goToGame={() => setPage(Page.Game)} />}
      {page === Page.Leaderboard && <Leaderboard leaderboard={leaderboard} />}
      {page === Page.Game && (
        <>
          { score !== null && <Score user={config.data.user} score={score} />}
          { frameData && <Frame data={frameData} />}
          { lost && (rank ? <TopRank rank={rank} /> : <LostAlert />) }
        </>
      )}
    </Box>
  );
}
