import { combineLatest, from, mergeMap, of } from "rxjs";
import { source } from ".";
import { postPageForLemmatization, postPageUpdate } from "./queries";

export const save = source.selectUpdatePayload.pipe(
    mergeMap((payload) => {
        if (payload.bodyLines || payload.marginLines) {
            const lines = [...(payload.bodyLines ?? []), ...(payload.marginLines ?? [])]
            return combineLatest(
                [of(payload),
                from(postPageForLemmatization({ page: { info: { id: payload.id }, lines } }))]);
        } else {
            return combineLatest([of(payload), of(undefined)]);
        }

    }),
    mergeMap(([payload, lemmas]) => {
        return from(postPageUpdate({ ...payload, lemmas: lemmas?.filter(({ line }) => line >= 0) }))
    })

)