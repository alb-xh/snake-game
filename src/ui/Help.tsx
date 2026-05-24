import React from "react";
import { Box, Text } from "ink";

const content = [
  { key: 'G', description: 'Open game' },
  { key: 'P', description: "Pause / Unpause" },
  { key: 'R', description: 'Play again' },
  { key: 'N', description: 'Edit name' },
  { key: 'L', description: 'Open leaderboard' },
  { key: 'H', description: 'Help' },
  { key: 'CTRL + C', description: 'Exit' }
];

export default function Help () {
  return (
    <Box display="flex" flexDirection="column" borderStyle="single" alignItems="center" justifyContent="center" borderRight={false} borderTop={false} borderLeft={false}  >
      <Box display="flex" width={64} borderStyle="bold" borderRight={false} borderLeft={false}>
          <Box display="flex" width={32} justifyContent="center" borderBottom={false} borderTop={false} borderStyle='doubleSingle'>
              <Text bold>Key</Text>
          </Box>
          <Box display="flex" width={32} justifyContent="center" borderBottom={false} borderTop={false} borderStyle='doubleSingle'>
              <Text bold>Description</Text>
          </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        {content.map(({ key, description }) => (
          <Box key={key} width={64} display="flex" >
              <Box display="flex" paddingY={1} width={32} justifyContent="center" borderBottom={false} borderTop={false} borderStyle='doubleSingle'>
                  <Text>{key}</Text>
              </Box>
              <Box display="flex" paddingY={1} width={32} justifyContent="center" borderBottom={false} borderTop={false} borderStyle='doubleSingle'>
                  <Text>{description}</Text>
              </Box>
          </Box>
        ))}
      </Box>      
    </Box>
  );
}
