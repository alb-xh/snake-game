import React from "react";
import _ from 'lodash';

import { Box, Text, Newline } from "ink";
import { Select } from '@inkjs/ui';

type Props = {
  name: string,
  options: string[],
  onChange: ((value: string) => void),
}

export default function Selector ({ name, options, onChange }: Props)  {
  return (
    <Box flexDirection="column" alignItems="center">
      <Text>Select {name.toLowerCase()}:</Text>
      <Newline />
      <Select
        options={options.map((option) => ({ label: _.capitalize(option), value: option }))}
        onChange={onChange}
      />
    </Box>
  );
}