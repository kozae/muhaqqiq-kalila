import { CommandBarContainer } from "pages-tool-shared-ui";
import { ButtonToggle, SmallButton } from "common-components";
import EditionSymbolsDropdownMenu from "./EditionSymbolsDropdownMenu";
import { useInterfaceControls } from "pages-tool-store";

export default function CommandBar() {
  const controls = useInterfaceControls();
  const [
    transcriptionPanelPreviewEnabled,
    disableTranscriptionPanelPreview,
    enableTranscriptionPanelPreview,
  ] = controls(
    ({
      transcriptionPanelPreviewEnabled,
      disableTranscriptionPanelPreview,
      enableTranscriptionPanelPreview,
    }) => [
      transcriptionPanelPreviewEnabled,
      disableTranscriptionPanelPreview,
      enableTranscriptionPanelPreview,
    ]
  );
  return (
    <CommandBarContainer>
      <EditionSymbolsDropdownMenu />
      <ButtonToggle
        enabled={transcriptionPanelPreviewEnabled}
        onChange={(v) => {
          if (v) {
            enableTranscriptionPanelPreview();
          } else {
            disableTranscriptionPanelPreview();
          }
        }}
        labelOn="Show Preview"
        labelOff="No Preview"
      />
    </CommandBarContainer>
  );
}
