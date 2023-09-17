import route from "@client/route";
import { filter, mergeMap, tap, distinctUntilChanged } from "rxjs";
import { getPageData } from "./queries";
import { source } from "./subjects";
import { requestAction } from ".";
import facsimileWorker from "../facsimile-worker";

route
  .pipe(
    filter((path) => path[0] === "pages" && path.length >= 3),
    distinctUntilChanged(
      (prevPath, currPath) =>
        !(prevPath[1] !== currPath[1] || prevPath[2] !== currPath[2]),
    ),
    tap(() => {
      source.selectBasicInfo.next(undefined);
      source.selectImageDataUrl.next(undefined);
    }),
    mergeMap((path) => getPageData(path[1], path[2])),
  )
  .subscribe(({ siglum, page, imageDataUrl }) => {
    const data = page!;
    facsimileWorker.postMessage({ type: 1, payload: imageDataUrl });
    requestAction("loadState", { ...data, imageDataUrl, siglum: siglum! });
  });
