import React from "react";
import _ from 'lodash';

import { Box, Text, Newline } from "ink";
import { Select } from '@inkjs/ui';

type Props = {
  name: string,
  options: string[],
  onChange: ((value: string) => void),
}

const transformOption = (option: string) => ({ label: _.capitalize(option), value: option });

export default function Selector (props: Props)  {
  return (
    <Box flexDirection="column" alignItems="center">
      <Text>Select {props.name.toLowerCase()}:</Text>
      <Newline />
      <Select
        options={props.options.map((op) => transformOption(op))}
        onChange={props.onChange}
      />
    </Box>
  );
}