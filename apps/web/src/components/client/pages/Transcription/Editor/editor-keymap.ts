import { keymap, EditorView } from "@codemirror/view";

export const editorKeymap = keymap.of([
  {
    key: "Ctrl-Shift-1",
    mac: "Cmd-Alt-1",
    run: (view: EditorView) => {
      view.dispatch({
        changes: {
          from: view.state.selection.main.from,
          insert: "†",
        },
      });

      return true;
    },
  },
]);
