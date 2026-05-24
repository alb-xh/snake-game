import React from "react";
import { Box, Text } from "ink";
import Keyboard from '../game/components/keyboard.js';

type Props = {
  defaultValue: string;
  regex?: RegExp;
  minLength?: number;
  maxLength?: number;
  errorMessage?: string;
  width?: number;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
};

export default function TextInput ({ 
  defaultValue, 
  regex, 
  minLength, 
  maxLength = 32,
  width = 64, 
  errorMessage = "Invalid input.",
  onSubmit,
  onCancel,
}: Props) {
  const [ cursorVisible, setCursorVisible ] = React.useState(true);
  const [ value, setValue ] = React.useState(defaultValue);

  const invalid = (minLength && value.length < minLength) || (maxLength && value.length > maxLength) || (regex && !regex.test(value));

  React.useEffect(() => {
    const onPress = Keyboard.onPress((key) => {
      if (key.name === 'escape') return onCancel && onCancel();
      if (key.name === 'return') return !invalid && onSubmit && onSubmit(value);
      if (key.name === 'backspace') return setValue((v) => v.slice(0, -1));
      if (key.sequence && key.sequence.length === 1) return setValue((v) => v.length > maxLength ? v : v + key.sequence);
    });

    const interval = setInterval(() => {
      setCursorVisible((visible) => !visible);
    }, 500);

    return () => {
      Keyboard.offPress(onPress);
      clearInterval(interval);
    };
  }, [ invalid, value, defaultValue, maxLength, onSubmit ]);
 
  return (
     <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <Box display="flex" justifyContent="center" width={width} padding={1} borderStyle="round"  borderColor={invalid ? "red" : "green"}>
        <Text>{value}</Text>
        <Text color="gray">{cursorVisible ? "|" : " "}</Text>
      </Box>
      <Box width={width} display="flex" justifyContent="center">
        {invalid 
          ? <Text color="red">{errorMessage}</Text> 
          : (
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
              <Text color="white">Press Enter to save changes.</Text>
              <Text color="white">Press Esc to cancel.</Text>
            </Box>
          )
        }
      </Box>
    </Box>
  );
}
