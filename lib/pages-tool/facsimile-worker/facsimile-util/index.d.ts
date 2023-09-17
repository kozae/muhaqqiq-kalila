/* tslint:disable */
/* eslint-disable */
/**
*  Generates a facsimile placeholder with given width and height in mm, and optional background color and grid color.
*  The resulting image has a resolution of (10\*width x 10\*height).
*  Each square on the grid corressponds to a single square mm.
*
*  # Arguments
*
* `w` - An optional width in mm for the facsimile. Default is A4_WIDTH = 210.
*
*  `h` - An optional height in mm for the facsimile. Default is A4_HEIGHT = 297.
*
*  `bg_color` - An optional RGB background color as a 3-element array of 8-bit integers.
*               Default is PARCHAMENT_YELLOW = [227, 221, 202].
*
*  `grid_color` - An optional RGB grid color as a 3-element array of 8-bit integers.
*                  Default is BLACK = [0, 0, 0].
*
*   # Returns
*
*   A base64 encoded string representation of the image.
*
*  # Example with default values:
*
*  ```
*  let facsimile = generate_placeholder(None, None, None, None);
*  ```
* # Example with white background and blue gridlines:
*
*  ```
*   let facsimile = generate_placeholder(Some(100), Some(100), None, None);
* @param {number | undefined} w
* @param {number | undefined} h
* @param {Uint8Array | undefined} bg_color
* @param {Uint8Array | undefined} grid_color
* @returns {string}
*/
export function generate_placeholder(w?: number, h?: number, bg_color?: Uint8Array, grid_color?: Uint8Array): string;
/**
*/
export class FacsimileCropper {
  free(): void;
/**
* @param {string} encoded_file
* @returns {FacsimileCropper}
*/
  static new(encoded_file: string): FacsimileCropper;
/**
* @returns {string}
*/
  get_url(): string;
/**
* @param {Uint32Array} p
* @param {number} r
* @param {Uint32Array} frame_color
* @param {number | undefined} padding_percentage
* @returns {string}
*/
  get_region(p: Uint32Array, r: number, frame_color: Uint32Array, padding_percentage?: number): string;
}
/**
*/
export class LayoutAnalyzer {
  free(): void;
/**
* @param {string} encoded_file
* @returns {LayoutAnalyzer}
*/
  static from_base64(encoded_file: string): LayoutAnalyzer;
/**
* @returns {string}
*/
  get_url(): string;
}
/**
*/
export class LineDetector {
  free(): void;
/**
* @param {string} encoded_file
* @returns {LineDetector}
*/
  static new(encoded_file: string): LineDetector;
/**
* @param {Uint32Array} region
* @param {number} thresh
* @param {number} density
* @returns {Uint32Array}
*/
  detect_lines_in_region(region: Uint32Array, thresh: number, density: number): Uint32Array;
}
