import { StateContext } from "@state/StateProvider";
import { useContext } from "react";

export default function useAppImage() {
  const { image } = useContext(StateContext);

  return { image };
}
