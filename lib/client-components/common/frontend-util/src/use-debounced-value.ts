import { useSyncExternalStore } from "react";
import { BehaviorSubject, debounceTime, distinctUntilChanged, tap } from "rxjs";

export function useDebouncedValue<T>(
  subject$: BehaviorSubject<T>,
  delay: number,
  comparator?: ((previous: T, current: T) => boolean) | undefined
) {
  const subscribe = (notify: any) => {
    const sub = subject$
      .pipe(debounceTime(delay), distinctUntilChanged(comparator))
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
