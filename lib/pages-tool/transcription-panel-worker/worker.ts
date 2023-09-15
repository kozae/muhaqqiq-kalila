let currentLine = -1;
self.onmessage = async (e: MessageEvent<{ type: any; payload: any }>) => {
  switch (e.data.type) {
    case 1:
      const { findSyntaxErrors } = await import(
        "pages-tool-transcription-panel-wasm"
      );
      const error = findSyntaxErrors(e.data.payload);
      if (error.length !== 0) {
        self.postMessage({ type: 2, payload: error });
      } else {
        self.postMessage({ type: 3 });
      }
      break;
    case 4:
      if (e.data.payload.line.number !== currentLine) {
        currentLine = e.data.payload.line.number;
        self.postMessage({ type: 5, payload: currentLine });
      }
      break;
    default:
      break;
  }
};
