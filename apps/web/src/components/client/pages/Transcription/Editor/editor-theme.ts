import createTheme, { type CreateThemeOptions } from "@uiw/codemirror-themes";

export const baseTheme: CreateThemeOptions = {
  theme: "light",
  settings: {
    background: "#ffffff",
    foreground: "#0a0f13",
    caret: "#0a0f13",
    selection: "#b6c3ce",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBackground: "#ffffff",
    gutterForeground: "#1b2e3c",
  },
  styles: [],
};

export const editorTheme = createTheme(baseTheme);
