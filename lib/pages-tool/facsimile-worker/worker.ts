import {FacsimileCropper} from "./facsimile-util";

let cropper: any;
console.log('worker loaded');
self.onmessage = async (e: MessageEvent<{ type: any; payload: any }>) => {
 
  switch (e.data.type) {
    case 1:
      if (e.data.payload) {
        cropper = FacsimileCropper.new(base46(e.data.payload));
        console.log("cropper loaded");
      }

      break;
    case 2:
      if (cropper && e.data.payload) {
        const { p, r, frameColor, padding } = e.data.payload;
        const rotation = isNaN(r) ? 0 : r;
        const region = cropper.get_region(p, rotation, frameColor, padding);
        self.postMessage({ type: "preview", payload: region });
      }
      break;

    default:
      break;
  }
};

const base46 = (data: string) =>
  data.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
