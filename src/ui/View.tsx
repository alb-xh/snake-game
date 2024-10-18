import React from "react";
import _ from 'lodash';
import { Box, Text } from "ink";

import type { FrameData } from "../game/index.js";

export default function View ({ frame }: { frame: FrameData })  {
  return (
    <Box flexDirection="column" borderStyle='double'>
      {
        frame.map((row, i) => (
          <Box key={i}>
            {
              row.map((cell, j) => (
                <Text
                  key={j}
                  color={cell.color}
                  backgroundColor={cell.bgColor}
                >
                  {cell.value}
                </Text>
              ))
            }
          </Box>
        ))
      }
    </Box>
  );
}
