import { fromEvent, merge } from 'rxjs';
import { map, distinctUntilChanged, startWith, shareReplay } from 'rxjs/operators';

const QUERY_PARAMS_UPDATED = 'queryParamsUpdated';


const dispatchQueryParamsUpdatedEvent = () => {
    const event = new Event(QUERY_PARAMS_UPDATED);
    window.dispatchEvent(event);
};

const getQueryParams = () => window.location.search;

const getQueryParamValues = (keys: string[]) => {
    const params = new URLSearchParams(window.location.search);
    const values: Record<string, string | null> = {};
    keys.forEach(key => {
        values[key] = params.get(key);
    });
    return values;
};

const queryParamsChange$ = merge(
    fromEvent(window, QUERY_PARAMS_UPDATED),
    fromEvent(window, 'popstate'),
    fromEvent(window, 'hashchange')
).pipe(
    map(getQueryParams),
    distinctUntilChanged()
);


export const analysisDocFromUrl$ = queryParamsChange$.pipe(
    map(() => getQueryParamValues(['version', 'timestamp'])),
    startWith(getQueryParamValues(['version', 'timestamp'])),
    distinctUntilChanged((prev, curr) => {
        const prevVersion = prev.version;
        const prevTimestamp = prev.timestamp;
        const currVersion = curr.version;
        const currTimestamp = curr.timestamp;

        // Compare version and timestamp values
        return prevVersion === currVersion && prevTimestamp === currTimestamp;
    }),
    shareReplay(1) // Ensures new subscribers get the latest value
);

export function setQueryParams(params: Record<string, string>, dispatch = true) {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
    });

    // Update the browser's URL without navigating
    window.history.pushState({}, '', url);
    if (dispatch) {
        dispatchQueryParamsUpdatedEvent();
    }
}

export function clearQueryParams(dispatch = true) {
    const url = new URL(window.location.href);
    url.search = ''; // Clear all query parameters

    // Update the browser's URL without navigating
    window.history.pushState({}, '', url);
    if (dispatch) {
        dispatchQueryParamsUpdatedEvent();
    }
}
