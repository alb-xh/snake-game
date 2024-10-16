import React from "react";
import _ from 'lodash';

import { Box, Text } from "ink";

import type GameEngine from "../game-engine.js";

type Props = { engine: GameEngine }

export default function Game (props: Props)  {
  return (
    <Box
      flexDirection="column"
      borderStyle={'double'}
      width={props.engine.settings.width + 2}
      height={props.engine.settings.height + 2}
    >
      {
        [ ...Array(30) ].map((e, i) => (
          <Text key={i} color="black" backgroundColor="red">{[ ...Array(120).fill('0') ].join('')}</Text>
        ))
      }
    </Box>
  );
}
