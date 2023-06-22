import Modal from "react-modal";

import { usePageDataStore } from "pages-tool-store";
import { base46 } from "@helpers/index";
import { FacsimileCropper } from "@muhaqiq/facsimile";
import ResizablePreview from "./ResizablePreview";

Modal.setAppElement("#root"); // Set the root element for the modal for accessibility purposes

export default function ZoomModal() {
  const store = usePageDataStore();
  const image = store((state) => {
    return state.imageDataUrl;
  });
  const cropper = FacsimileCropper.new(base46(image));

  return <ResizablePreview cropper={cropper} />;
}
