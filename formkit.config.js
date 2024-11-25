// formkit.config.ts
import { generateClasses } from "@formkit/themes";
import defaultTheme from "./formkit.theme.js";
import customInputs from "./components/formkit";

export default {
  config: {
    classes: generateClasses(defaultTheme),
  },
  inputs: customInputs,
};
