import { useSyncExternalStore } from "react";
import { BehaviorSubject, debounceTime, distinctUntilChanged } from "rxjs";

export function useDebouncedValue<T>(
  subject$: BehaviorSubject<T>,
  delay: number
) {
  const subscribe = (notify: any) => {
    const sub = subject$
      .pipe(distinctUntilChanged(), debounceTime(delay))
      .subscribe(notify);

    return () => sub.unsubscribe();
  };

  const value = useSyncExternalStore(
    subscribe,
    () => subject$.getValue(),
    () => subject$.getValue()
  );
  return value;
}
