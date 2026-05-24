import React from "react";
import { Box, Text } from "ink";

export default function LostAlert ()  {
  return (
    <Box borderStyle='round' borderColor='red' paddingX={1} gap={2}> 
      <Text color='red'>✘</Text> 
      <Text>You lost :(</Text>
    </Box>
  );
}
