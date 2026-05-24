import React from "react";
import { Box, Text } from "ink";

export default function Leaderboard ({ leaderboard }: { leaderboard: { user: string, score: number }[] }) {
  return (
    <Box display="flex" flexDirection="column" borderStyle="single" alignItems="center" justifyContent="center" borderRight={false} borderTop={false} borderLeft={false}  >
      <Box display="flex" width={60} borderStyle="bold" borderRight={false} borderLeft={false}>
          <Box display="flex" width={20} justifyContent="center" borderBottom={false} borderTop={false} borderRight={false} borderStyle='single'>
              <Text bold>Rank</Text>
          </Box>
          <Box display="flex" width={20} justifyContent="center">
              <Text bold>Name</Text>
          </Box>
          <Box display="flex" width={20} justifyContent="center" borderBottom={false} borderTop={false} borderLeft={false} borderStyle='single'>
              <Text bold>Score</Text>
          </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        {leaderboard.map(({ user, score }, i) => (
          <Box key={user} width={60} display="flex" >
              <Box display="flex" width={20} justifyContent="center" borderBottom={false} borderTop={false} borderRight={false} borderStyle='single'>
                  <Text>{i+ 1}</Text>
              </Box>
              <Box display="flex" width={20} justifyContent="center">
                  <Text>{user}</Text>
              </Box>
              <Box display="flex" width={20} justifyContent="center" borderBottom={false} borderTop={false} borderLeft={false} borderStyle='single'>
                  <Text>{score}</Text>
              </Box>
          </Box>
        ))}
      </Box>      
    </Box>
  );
}
