import { fromEvent, merge } from 'rxjs';
import { map, distinctUntilChanged, startWith, shareReplay } from 'rxjs/operators';

// Utility function to get the query parameters as a string
const getQueryParams = () => window.location.search;

// Utility function to extract a specific query parameter value
const getQueryParamValue = (key: string) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
};

// Create an observable that emits on popstate and hashchange events
const queryParamsChange$ = merge(
    fromEvent(window, 'popstate'),
    fromEvent(window, 'hashchange')
).pipe(
    map(getQueryParams),
    distinctUntilChanged()
);

// Derived observable to emit only the 'chapter' query parameter value
export const chapterParam$ = queryParamsChange$.pipe(
    map(() => getQueryParamValue('chapter')),
    startWith(getQueryParamValue('chapter')),
    distinctUntilChanged(),
    shareReplay(1) // Ensures new subscribers get the latest value
);

export function setQueryParam(key: string, value: string) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);

    // Update the browser's URL without navigating
    window.history.pushState({}, '', url);
}
