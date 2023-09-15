export type SelectorFn<T, R, P> = (params: P) => (state: T) => R;

export type ActionFn<T, R, P> = SelectorFn<T, Promise<R>, P>;
