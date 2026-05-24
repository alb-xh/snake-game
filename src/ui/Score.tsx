import React from "react";
import { Box, Text } from "ink";

export default function Score ({ user, score }: { user: string, score: number })  {
  return (
    <Box display="flex" gap={10} marginBottom={1}>
      {user && (
        <Box display="flex">
          <Text bold>Name: {user}</Text>
        </Box>
      )}
      <Box display="flex">
        <Text bold>Score: {score}</Text>
      </Box>
    </Box>
  );
}
