import React from "react";
import { Box } from "ink";
import type Config from "../config/index.js";
import TextInput from "./TextInput.js";

export default function Edit ({ config, goToGame }: { config: Config, goToGame: () => void }) {
  return (
    <Box display="flex">
      <TextInput
        defaultValue={config.data.user}
        onCancel={goToGame}
        onSubmit={(user) => { 
          config.save({ user }); 
          goToGame(); 
        }}
        regex={/^[a-zA-Z0-9_]+$/}
        minLength={8}
        maxLength={32}
        errorMessage={`Username must be 8-32 chars and use only letters, numbers, or _.`}
      />
    </Box>
  );
}
