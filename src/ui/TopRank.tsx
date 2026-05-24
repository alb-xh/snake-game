import React from "react";
import { Box, Text } from "ink";

export default function TopRank ({ rank }: { rank: number })  {
  return (
    <Box borderStyle='round' borderColor='green' paddingX={1} gap={2}> 
      <Text color='green'>★</Text> 
      <Text>Top {rank}!</Text>
    </Box>
  );
}
