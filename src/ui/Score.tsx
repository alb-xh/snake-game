import React from "react";
import { Box, Text } from "ink";

export default function Score ({ score }: { score: number })  {
  return (
    <Box margin={1}>
      <Text bold>Score: {score}</Text>
    </Box>
  );
}
