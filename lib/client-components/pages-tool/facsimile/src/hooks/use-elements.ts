import { StateContext } from "@state/StateProvider";
import { useContext } from "react";

export default function useElements() {
  const { elements } = useContext(StateContext);

  return elements;
}
