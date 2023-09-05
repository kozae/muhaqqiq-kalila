import { StateContext } from "@state/StateProvider";
import { useContext } from "react";

export default function useStateSize() {
  const { width, height, scaleRatio } = useContext(StateContext);

  return { width, height, scaleRatio };
}
