import React from "react";
import _ from 'lodash';

import { Box, Text } from "ink";

import { Difficulty, Maps } from "./enums.js";

type Props = {
  difficulty: string,
  map: string,
}

export default function Game (props: Props)  {
  return (
    <Box
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width={120}
      height={30}
      borderStyle={'round'}
    >
      <Text>WIP</Text>
    </Box>
  );
}
