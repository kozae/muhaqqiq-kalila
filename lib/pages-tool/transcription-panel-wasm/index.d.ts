/* tslint:disable */
/* eslint-disable */
/**
* @param {string} text
* @returns {(WasmTextError)[]}
*/
export function check_text(text: string): (WasmTextError)[];
/**
*/
export class WasmTextError {
  free(): void;
/**
*/
  error_type: number;
/**
*/
  from: number;
/**
*/
  line: number;
/**
*/
  string_error: string;
/**
*/
  to: number;
}
