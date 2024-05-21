import route from "@client/route";
import { filter, mergeMap, tap, distinctUntilChanged, of, combineLatest, throwError } from "rxjs";
import { getMedium, getPageData } from "./queries";
import { source } from "./subjects";
import { requestAction } from ".";
import facsimileWorker from "../facsimile-worker";
import { FacsimileWorkerEvent } from "pages-tool-facsimile-worker";
import { fetchAuthSession, fetchUserAttributes } from "@aws-amplify/auth";

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
    mergeMap((path) => combineLatest([of(path[2]), getMedium(path[1]), of(path[1]), fetchUserAttributes(), fetchAuthSession({ forceRefresh: true })])),
    mergeMap(([pageId, { siglum, editor }, mediumId, user, authSession]) => {
      const username = authSession?.tokens?.idToken?.payload["cognito:username"];
      if (username !== editor) {
        return throwError(() => ({ editor, username, siglum, pageId, mediumId }));
      }
      return combineLatest([of(pageId), of(siglum)])
    }),
    mergeMap(([pageId, siglum]) => combineLatest([getPageData(pageId), of(siglum)])),
  )
  .subscribe(
    {
      next: ([{ page, imageDataUrl }, siglum]) => {
        const data = page!;
        facsimileWorker.postMessage({
          type: FacsimileWorkerEvent.LOAD,
          payload: imageDataUrl,
        });
        requestAction("loadState", { ...data, imageDataUrl, siglum: siglum! });
      },
      error: ({ editor, username, siglum, pageId, mediumId }) => {

        window.location.href = `/pages/${mediumId}/unauthorized?user=${username}&editor=${editor}&siglum=${siglum}&pageId=${pageId}`;
      },
    }
  );

