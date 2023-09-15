import route from "@client/route";
import { filter, map } from "rxjs";

const currectTool = route.pipe(
  filter((path) => path[0] === "pages" && path.length === 4),
  map((path) => path[3]),
);

export default currectTool;
