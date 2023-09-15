import route from "@client/route";
import { filter, mergeMap, tap, distinctUntilChanged } from "rxjs";
import { postToWorker } from "./dispatchers";
import { getPageData } from "./queries";
import { StoreBrowserEvent } from "pages-tool-store-worker";
import { imageDataUrl$, title$ } from ".";

route
  .pipe(
    filter((path) => path[0] === "pages" && path.length >= 3),
    distinctUntilChanged(
      (prevPath, currPath) =>
        !(prevPath[1] !== currPath[1] || prevPath[2] !== currPath[2]),
    ),
    tap(() => {
      title$.next(undefined);
      imageDataUrl$.next(undefined);
    }),
    mergeMap((path) => getPageData(path[1], path[2])),
  )
  .subscribe(({ siglum, page, imageDataUrl }) => {
    const data = page!;
    postToWorker({
      event: StoreBrowserEvent.LOAD_STATE,
      payload: { ...data, imageDataUrl, siglum: siglum! },
    });
  });
